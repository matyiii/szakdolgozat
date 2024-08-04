import DataService from '@/service/DataService';
import { Button } from 'rsuite';
import useUser from '@/hooks/useUser';

const Welcome = () => {
	const { user } = useUser();

	return (
		<div>
			{`Welcome - ${user.name}`}
			<div className='content-div'>
				<img
					src='http://localhost:8000/storage/uploads/images/cpu.jpg'
					className='max-w-60'
				/>
				<Button
					onClick={() => {
						DataService.dummy
							.test()
							.then((res) => console.log(res))
							.catch((err) => console.log(err));
					}}
				>
					TEST
				</Button>
			</div>
		</div>
	);
};

export default Welcome;
