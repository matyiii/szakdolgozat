import DataService from '@/service/DataService';
import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import Preview from '@/components/ThreeDModel/Preview/Preview';
import PrintItBackground from '@/assets/printit_background.webp';

const Welcome = () => {
	const { user } = useUser();
	const [models, setModels] = useState<ThreeDModelType[]>();

	useEffect(() => {
		DataService.threeD
			.getHighlightedModels()
			.then((res) => {
				console.log(res);
				setModels(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='flex flex-col flex-1 p-6'>
			<img src={PrintItBackground} className='w-full max-h-[20rem] h-auto object-cover rounded-lg shadow-md mb-6' alt='Background' />
			<h2 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>Highlighted Models</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{models?.map((model) => (
					<div key={model.id} className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
						<Preview model={model} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Welcome;
