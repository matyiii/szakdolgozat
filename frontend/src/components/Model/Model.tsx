import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/Addons.js';

type Props = {
	url: string;
};

export const Model = ({ url }: Props) => {
	const geom = useLoader(STLLoader, url);

	return (
		<>
			<mesh>
				<primitive object={geom} attach='geometry' />
				{/*<meshStandardMaterial color={'orange'} metalness={0.5} />*/}
				<meshBasicMaterial color={'green'} />
				{/*<meshDepthMaterial />*/}
			</mesh>
			<ambientLight />
			<pointLight position={[50, 50, 50]} />
		</>
	);
};
