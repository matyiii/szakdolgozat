import DataService from '@/service/DataService';
import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import Preview from '@/components/ThreeDModel/Preview/Preview';

const Welcome = () => {
	const { user } = useUser();
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
		<div className='flex flex-col w-full h-full'>
			<div className='flex justify-center bg-orange-300'>
				<h1 className='text-6xl text-slate-400 font-bold my-6'>PrintIT</h1>
			</div>
			<div className='flex-1 bg-yellow-300'>
				<div className='p-4'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						{models?.map((model) => {
							return <Preview key={model.id} model={model} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
