import DataService from '@/service/DataService';
import { useState } from 'react';
import { Button, Input } from 'rsuite';
import ApiError from '@/components/ApiErrror/ApiError';
import toast from 'react-hot-toast';

type Props = {
	forumId: any;
	topicId: any;
	updateTopic: any;
};

const NewForumComment = ({ forumId, topicId, updateTopic }: Props) => {
	/* State */
	const [comment, setComment] = useState<string>('');

	/* Functions */
	const handleCommentChange = (value: string) => {
		setComment(value);
	};

	const post = () => {
		const payload: NewForumCommentPayload = {
			forum_id: Number(forumId),
			topic_id: Number(topicId),
			new_comment: comment,
		};

		DataService.forum
			.postComment(payload)
			.then((res) => {
				updateTopic(res.data.comments);
				setComment('');
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	};

	const cancel = () => {
		setComment('');
	};

	return (
		<div className='flex flex-col gap-1 bg-slate-100 p-2 rounded-lg'>
			<Input as='textarea' rows={2} onChange={handleCommentChange} value={comment} />
			<div className='flex flex-row flex-wrap justify-between mt-1'>
				<Button onClick={cancel} disabled={!comment.length}>
					Cancel
				</Button>
				<Button onClick={post} disabled={!comment.length}>
					Post
				</Button>
			</div>
		</div>
	);
};

export default NewForumComment;
