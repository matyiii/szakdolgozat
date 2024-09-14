import ForumComponent from '@/components/Forum/ForumComponent';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Forum = () => {
	/* State */
	const [forums, setForums] = useState<ForumType[]>();

	/* Effects */
	useEffect(() => {
		DataService.forum
			.getForums()
			.then((res) => {
				console.log(res);
				setForums(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='w-full h-full bg-gray-100 p-6'>
			<div className='max-w-screen-lg mx-auto flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg'>
				{forums?.map((forum: ForumType) => {
					return (
						<NavLink key={forum.id} to={`/forum/${forum.id}`} className='w-full'>
							<ForumComponent forum={forum} />
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default Forum;
