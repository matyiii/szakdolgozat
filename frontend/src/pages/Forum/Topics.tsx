import ApiError from '@/components/ApiErrror/ApiError';
import Topic from '@/components/Forum/Topic';
import TopicUploadModal from '@/components/Forum/TopicUploadModal';
import useModal from '@/hooks/useModal';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'rsuite';

const Topics = () => {
	/* Hooks */
	const { forum_id } = useParams();
	const { open: isTopicUploadOpen, onClose: onTopicUploadClose, onOpen: onTopicUploadOpen } = useModal();

	/* State */
	const [topics, setTopics] = useState<TopicType[]>([]);

	const forumId = Number(forum_id);

	/* Effects */
	useEffect(() => {
		DataService.forum
			.getTopics(forumId)
			.then((res) => setTopics(res.data))
			.catch((err) => {
				console.log(err);
			});
	}, [forum_id]);

	/* Functions */
	const onTopicUpload = (newTopic: TopicType) => {
		const payload: CreateTopicPayload = { forum_id: forumId, new_topic: newTopic };

		DataService.forum
			.createTopic(payload)
			.then((res) => {
				const topic = res.data.new_topic;

				setTopics((prevValues) => {
					return [topic, ...prevValues];
				});
				onTopicUploadClose();
			})
			.catch((err) => {
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 3000,
				});
			});
	};

	return (
		<div className='w-full h-full p-6'>
			<div className='max-w-screen-lg mx-auto'>
				<div className='flex my-4 justify-end'>
					<Button appearance='primary' onClick={onTopicUploadOpen}>
						Add new topic
					</Button>
				</div>

				<div className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg'>
					{topics?.map((topic: TopicType) => {
						return (
							<NavLink key={topic.id} to={`/forum/${forum_id}/${topic.id}`} className='w-full'>
								<Topic topic={topic} />
							</NavLink>
						);
					})}
				</div>
			</div>

			<TopicUploadModal open={isTopicUploadOpen} onClose={onTopicUploadClose} handleSubmit={onTopicUpload} />
		</div>
	);
};

export default Topics;
