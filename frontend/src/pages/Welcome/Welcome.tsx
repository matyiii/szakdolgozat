import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/auth/authSelector';
import STLViewer from '@/components/STLViewer/STLViewer';

const Welcome = () => {
	const user = useAppSelector(selectUser);

	return (
		<div>
			{`Welcome - ${user.name}`}
			<div className='content-div'>
				<STLViewer />
			</div>
		</div>
	);
};

export default Welcome;
