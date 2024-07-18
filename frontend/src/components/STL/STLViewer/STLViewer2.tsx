import React, { useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/Addons.js';

type Props = {
	url: string;
};

const STLViewer2 = ({ url }: Props) => {
	useEffect(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		const loader = new STLLoader();
		loader.load(url, (geometry) => {
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);

			camera.position.z = 5;
			const animate = () => {
				requestAnimationFrame(animate);
				mesh.rotation.x += 0.01;
				mesh.rotation.y += 0.01;
				renderer.render(scene, camera);
			};
			animate();
		});

		return () => {
			document.body.removeChild(renderer.domElement);
		};
	}, [url]);

	return null;
};

export default STLViewer2;
