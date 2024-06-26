import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '@/components/Model/Model';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/auth/authSelector';

const Welcome = () => {
	const user = useAppSelector(selectUser);

	return (
		<div>
			{`Welcome - ${user.name}`}
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
