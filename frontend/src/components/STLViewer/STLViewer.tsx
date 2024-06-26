import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

const STLModel = ({ url }: { url: string }) => {
	const geometry = useLoader(STLLoader, url);
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

				perspectiveCamera.position.z = center.z + cameraZ * 1; // Adjust this factor as needed
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

const STLViewer: React.FC = () => {
	return (
		<Canvas
			style={{ width: '100vw', height: '100vh' }}
			camera={{ position: [0, 0, 5], fov: 75 }}
			gl={{ antialias: true }}
			onCreated={({ gl, scene }) => {
				scene.background = new THREE.Color(0x808080);
			}}
		>
			<ambientLight intensity={0.5} />
			<directionalLight position={[1, 1, 1]} intensity={1} />
			<Suspense fallback={null}>
				<STLModel url='/3dmodels/stl_test.stl' />
			</Suspense>
			<OrbitControls />
		</Canvas>
	);
};

export default STLViewer;
