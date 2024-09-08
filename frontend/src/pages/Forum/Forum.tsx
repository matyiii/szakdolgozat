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
		<div>
			{forums?.map((forum: ForumType) => {
				return (
					<NavLink key={forum.id} to={`/forum/${forum.id}`}>
						<div>{forum.name}</div>
						<div>{forum.description}</div>
					</NavLink>
				);
			})}
		</div>
	);
};

export default Forum;
