import Preview from '@/components/ThreeDModel/Preview/Preview';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';

const Discover = () => {
	const [models, setModels] = useState<ThreeDModelType[]>();

	useEffect(() => {
		DataService.threeD
			.getMostLikedModels()
			.then((res) => {
				console.log(res);
				setModels(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold text-center mb-4'>Discover Prints</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{models?.map((model) => {
					return <Preview key={model.id} model={model} />;
				})}
			</div>
		</div>
	);
};

export default Discover;
