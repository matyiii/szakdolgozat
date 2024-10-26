import Preview from '@/components/ThreeDModel/Preview/Preview';
import UserPreview from '@/components/UserPreview/UserPreview';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';

const Discover = () => {
	const [models, setModels] = useState<ThreeDModelType[]>();
	const [users, setUsers] = useState<UserType[]>();

	useEffect(() => {
		DataService.threeD
			.discoverModels()
			.then((res) => {
				setModels(res.data.models);
				setUsers(res.data.users);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='p-4'>
			{models && (
				<div className='mb-8'>
					<h1 className='text-2xl font-bold text-center mb-4'>Discover Prints</h1>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						{models?.map((model) => {
							return <Preview key={model.id} model={model} />;
						})}
					</div>
				</div>
			)}
			{users && (
				<div>
					<h1 className='text-2xl font-bold text-center mb-4'>Discover Users</h1>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						{users?.map((user) => {
							return <UserPreview key={user.id} user={user} />;
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Discover;
