import ForumComment from '@/components/Forum/ForumComment';
import NewForumComment from '@/components/Forum/NewForumComment';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Comments = () => {
	/* Hooks */
	const { forum_id, topic_id } = useParams<{ forum_id: string; topic_id: string }>();

	/* State */
	const [comments, setComments] = useState<TopicCommentType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	/* Effects */
	useEffect(() => {
		if (forum_id && topic_id) {
			setLoading(true);
			DataService.forum
				.getComments(forum_id, topic_id)
				.then((res) => setComments(res.data.comments))
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		}
	}, [forum_id, topic_id]);

	/* Functions */
	const deleteComment = (commentId: number) => {
		setComments((prevValues) => {
			return prevValues.filter((c) => c.id !== commentId);
		});
	};

	const editComment = (updatedComment: TopicCommentType) => {
		setComments((prevValues) => {
			const updatedComments = prevValues.map((c) => {
				if (c.id === updatedComment.id) {
					return updatedComment;
				} else {
					return c;
				}
			});

			return updatedComments;
		});
	};

	return (
		<div className='w-full h-full bg-gray-100 p-6'>
			<div className='max-w-screen-lg mx-auto'>
				<div className='text-xl font-semibold text-gray-800 mb-4'>Comments</div>
				<div className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg'>
					{loading ? (
						<div className='text-center text-gray-500'>Loading comments...</div>
					) : (
						<>
							<NewForumComment
								forumId={forum_id}
								topicId={topic_id}
								updateTopic={(comments: TopicCommentType[]) => setComments(comments)}
							/>
							{comments.length > 0 ? (
								comments.map((comment) => (
									<ForumComment
										comment={comment}
										key={comment.id}
										deleteComment={deleteComment}
										editComment={editComment}
									/>
								))
							) : (
								<div className='text-sm text-gray-500'>No comments yet. Be the first to comment!</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comments;
