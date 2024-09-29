import { NavLink } from 'react-router-dom';
import { Button } from 'rsuite';

type Props = {
	model: ThreeDModelType;
};

const ModelCard = ({ model }: Props) => {
	return (
		<div className='border border-gray-200 rounded-lg p-6 bg-gray-50'>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='text-lg font-semibold'>{model.name}</h3>
				<NavLink to={`/models/${model.id}`}>
					<Button appearance='primary'>Details</Button>
				</NavLink>
			</div>

			<div>
				<p>
					<strong>Category:</strong> {model.category.name}
				</p>
				<p>
					<strong>Likes:</strong> {model.like_count}
				</p>
				<p>
					<strong>Downloads:</strong> {model.download_count}
				</p>
			</div>

			<div className='grid grid-cols-2 gap-4 mt-4'>
				{model.images.map((image) => (
					<div key={image.id} className='rounded-lg overflow-hidden shadow'>
						<img
							className='w-full h-full object-cover'
							src={`${import.meta.env.VITE_STORAGE_API}${image.path}`}
							alt={`Model Image ${image.id + 1}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ModelCard;
