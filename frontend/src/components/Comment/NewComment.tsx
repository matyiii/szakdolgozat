import DataService from '@/service/DataService';
import { useState } from 'react';
import { Button, Input } from 'rsuite';
import ApiError from '@/components/ApiErrror/ApiError';
import toast from 'react-hot-toast';

type Props = {
	modelId: number;
	updateModel: any;
};

const NewComment = ({ modelId, updateModel }: Props) => {
	const [comment, setComment] = useState<string>('');

	/* Functions */
	const handleCommentChange = (value: string) => {
		setComment(value);
	};

	const post = () => {
		const payload: CommentPayload = {
			model_id: modelId,
			text: comment,
		};

		DataService.threeD
			.postComment(payload)
			.then((res) => {
				updateModel(res.data.model);
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
		<div className='flex flex-col gap-1 bg-red-300 p-2 rounded-lg'>
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

export default NewComment;
