import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';

const Discover = () => {
	const [models, setModels] = useState<any[]>();

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
		<div>
			<h1>Discover</h1>
			<div>
				{models?.map((model) => {
					return (
						<div key={model.id}>
							<h2>{model.name}</h2>
							<img
								src={`http://localhost:8000/storage/${model.images[0]?.path}`}
								className='max-w-60'
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Discover;
