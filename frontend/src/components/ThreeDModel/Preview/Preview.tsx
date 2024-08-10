import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
	model: ThreeDModelType;
};

const Preview = ({ model }: Props) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<NavLink
			to={`/models/${model.id}`}
			className='relative bg-red-400 m-2 rounded-lg shadow-lg hover:bg-red-500 transition duration-300 ease-in-out hover:cursor-pointer flex flex-col items-center'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='flex flex-col items-center'>
				<div className='my-2 text-white text-lg font-semibold'>{model.name}</div>
				<div className='px-4 pb-4'>
					<img
						className='w-full max-w-xs rounded-lg shadow-md'
						src={
							model?.images && model.images.length > 0
								? `${import.meta.env.VITE_STORAGE_API}${model.images[0].path}`
								: '/images/placeholder.PNG'
						}
						alt='Model'
					/>
				</div>
			</div>
			{isHovered && (
				<div className='absolute w-full h-full pb-4 bg-black rounded-lg bg-opacity-20 flex flex-col items-center justify-end transition duration-300 ease-in-out'>
					<div className='text-white text-lg'>{model.like_count} Likes</div>
					<div className='text-white text-lg'>Category: {model.category.name}</div>
					<div className='text-white text-xl font-bold mb-2'>Uploaded by: {model.user.name}</div>
				</div>
			)}
		</NavLink>
	);
};

export default Preview;
