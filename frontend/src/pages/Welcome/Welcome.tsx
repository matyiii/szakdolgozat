import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import Preview from '@/components/ThreeDModel/Preview/Preview';
import PrintItBackground from '@/assets/printit_background_2.png';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilter } from '@/components/Filters/CategoryFilter';
import OrderBy from '@/components/Filters/OrderBy';

const Welcome = () => {
	/* Hooks */
	const [searchParams, setSearchParams] = useSearchParams();

	/* State */
	const [models, setModels] = useState<ThreeDModelType[]>([]);

	/* Effects */
	useEffect(() => {
		const params = Object.fromEntries(searchParams.entries());

		if (Object.keys(params).length === 0) {
			DataService.threeD
				.getHighlightedModels()
				.then((res) => {
					setModels(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			DataService.threeD
				.getFilteredModels(params)
				.then((res) => {
					setModels(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [searchParams]);

	/* Functions */
	const filterChangeHandler = (paramName: string, value: string) => {
		setSearchParams((params) => {
			params.set(paramName, value);
			return params;
		});
	};

	const filterCleanHandler = (paramName: string) => {
		setSearchParams((params) => {
			params.delete(paramName);
			return params;
		});
	};

	return (
		<div className='flex flex-col flex-1 p-6 w-screen'>
			<img
				src={PrintItBackground}
				className='w-full max-h-[20rem] h-auto object-cover rounded-lg shadow-md'
				style={{ objectPosition: '0 60%' }}
				alt='Background'
			/>
			<div className='flex flex-row justify-center items-center gap-5 my-6'>
				<CategoryFilter onFilterChange={filterChangeHandler} onClean={filterCleanHandler} />
				<OrderBy onSortChange={filterChangeHandler} onClean={filterCleanHandler} />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{models?.map((model) => <Preview key={model.id} model={model} />)}
			</div>
		</div>
	);
};

export default Welcome;
