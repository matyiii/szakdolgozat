import Topic from '@/components/Forum/Topic';
import TopicUploadModal from '@/components/Forum/TopicUploadModal';
import useModal from '@/hooks/useModal';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'rsuite';

const Topics = () => {
	/* Hooks */
	const { id } = useParams();
	const { open: isTopicUploadOpen, onClose: onTopicUploadClose, onOpen: onTopicUploadOpen } = useModal();

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
	}, [id]);

	/* Functions */

	return (
		<div className='w-full h-full p-6 bg-gray-100'>
			<div className='flex my-4 justify-end'>
				<Button appearance='primary' onClick={onTopicUploadOpen}>
					Add new topic
				</Button>
			</div>
			<div className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg'>
				{topics?.map((topic: TopicType) => {
					return (
						<NavLink key={topic.id} to={`/forum/${topic.id}`} className='w-full'>
							<Topic topic={topic} />
						</NavLink>
					);
				})}
			</div>

			<TopicUploadModal open={isTopicUploadOpen} onClose={onTopicUploadClose} handleSubmit={() => {}} />
		</div>
	);
};

export default Topics;
