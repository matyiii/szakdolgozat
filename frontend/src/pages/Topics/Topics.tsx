import Topic from '@/components/Forum/Topic';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Topics = () => {
	/* Hooks */
	const { id } = useParams();

	/* State */
	const [topics, setTopics] = useState<TopicType[]>([]);

	/* Effects */
	useEffect(() => {
		const forumId = Number(id);

		DataService.forum
			.getTopics(forumId)
			.then((res) => setTopics(res.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='w-full h-full p-6 bg-gray-100'>
			<div className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg'>
				{topics?.map((topic: TopicType) => {
					return (
						<NavLink key={topic.id} to={`/forum/${topic.id}`} className='w-full'>
							<Topic topic={topic} />
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default Topics;
