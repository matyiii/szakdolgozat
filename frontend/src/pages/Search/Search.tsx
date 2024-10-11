import Preview from '@/components/ThreeDModel/Preview/Preview';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
	/* Hooks */
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const searchQuery = queryParams.get('q');

	/* State */
	const [models, setModels] = useState<ThreeDModelType[]>([]);

	/* Effects */
	useEffect(() => {
		if (search) {
			DataService.site
				.search(search)
				.then((res) => {
					setModels(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [search]);

	return (
		<div className='p-4 bg-white rounded-xl shadow-lg'>
			<h1 className='text-2xl font-bold text-center mb-4'>{`Search Results for "${searchQuery}"`}</h1>
			{models.length === 0 ? (
				<p className='text-center text-gray-500'>No results found. Please try a different search.</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{models.map((model) => (
						<Preview key={model.id} model={model} />
					))}
				</div>
			)}
		</div>
	);
};

export default Search;
