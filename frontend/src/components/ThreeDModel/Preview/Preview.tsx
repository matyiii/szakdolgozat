import { useState } from 'react';
import { ThreeDModelType } from '@/shared';
import { NavLink } from 'react-router-dom';

type Props = {
	model: ThreeDModelType;
};

const Preview = ({ model }: Props) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<NavLink
			to={`/models/${model.id}`}
			className='relative bg-red-400 m-2 p-4 rounded-lg shadow-lg hover:bg-red-500 transition duration-300 ease-in-out hover:cursor-pointer flex flex-col items-center'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='flex flex-col items-center'>
				<div className='text-white text-lg font-semibold'>{model.name}</div>
				<div className='mt-4'>
					<img
						src={`http://localhost:8000/storage/${model.images[0]?.path}`}
						className='w-full max-w-xs rounded-lg shadow-md'
					/>
				</div>
			</div>
			{isHovered && (
				<div className='absolute inset-0 bg-black rounded-lg bg-opacity-20 flex flex-col items-center justify-center transition duration-300 ease-in-out'>
					<div className='text-white text-xl font-bold mb-2'>Uploaded by: {model.user.name}</div>
					<div className='text-white text-lg'>{model.category.name}</div>
					<div className='text-white text-lg'>{model.like_count} Likes</div>
				</div>
			)}
		</NavLink>
	);
};

export default Preview;
