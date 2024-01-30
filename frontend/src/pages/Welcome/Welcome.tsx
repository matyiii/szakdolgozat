import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '@/components/Model/Model';

import './Welcome.scss';

const Welcome = () => {
	return (
		<div>
			Welcome
			<div className='content-div'>
				<Canvas camera={{ position: [0, 10, 20] }}>
					<Suspense fallback={null}>
						<Model url={'../public/3dmodels/stl_test.stl'} />
					</Suspense>
					<OrbitControls />
				</Canvas>
			</div>
		</div>
	);
};

export default Welcome;
