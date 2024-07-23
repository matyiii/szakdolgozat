import { useRef, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

type Props = {
	fileId: number;
};

const STLModel = ({ fileId }: Props) => {
	const path = `${import.meta.env.VITE_FILES_API}${fileId}`;
	const geometry = useLoader(STLLoader, path);
	const meshRef = useRef<THREE.Mesh>(null);
	const { camera } = useThree();

	useEffect(() => {
		if (meshRef.current) {
			const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
			const center = boundingBox.getCenter(new THREE.Vector3());
			const size = boundingBox.getSize(new THREE.Vector3());

			if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
				const perspectiveCamera = camera as THREE.PerspectiveCamera;
				const maxDim = Math.max(size.x, size.y, size.z);
				const fov = perspectiveCamera.fov * (Math.PI / 180); // convert vertical fov to radians
				const cameraZ = Math.abs((maxDim / 2) * Math.tan(fov / 2)); // distance from the object

				perspectiveCamera.position.z = center.z + cameraZ * 1;
				perspectiveCamera.position.x = center.x + cameraZ * 0.1;
				perspectiveCamera.position.y = center.y - cameraZ * 4;
				perspectiveCamera.lookAt(center);
			}
		}
	}, [geometry, camera]);

	return (
		<mesh geometry={geometry} ref={meshRef}>
			<meshPhongMaterial color={0x00ff00} />
		</mesh>
	);
};

export default STLModel;
