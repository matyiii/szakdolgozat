import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import STLModel from '@/components/STL/STLModel/STLModel';
import * as THREE from 'three';

type Props = {
	fileId: number;
};

const STLViewer = ({ fileId }: Props) => {
	return (
		<Canvas
			camera={{ position: [0, 0, 5], fov: 75 }}
			gl={{ antialias: true }}
			onCreated={({ gl, scene }) => {
				scene.background = new THREE.Color(0x808080);
			}}
		>
			<ambientLight intensity={0.5} />
			<directionalLight position={[1, 1, 1]} intensity={1} />
			<Suspense fallback={null}>
				<STLModel fileId={fileId} />
			</Suspense>
			<OrbitControls />
		</Canvas>
	);
};

export default STLViewer;
