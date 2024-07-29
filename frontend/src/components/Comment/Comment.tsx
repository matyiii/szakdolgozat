import useUser from '@/hooks/useUser';
import DataService from '@/service/DataService';
import MoreIcon from '@rsuite/icons/More';
import { Button, Dropdown, Input } from 'rsuite';
import ApiError from '@/components/ApiErrror/ApiError';
import toast from 'react-hot-toast';
import { useState } from 'react';

type Props = {
	comment: CommentType;
	deleteComment: any;
	handleCommentChange: any;
};

const Comment = ({ comment, deleteComment, handleCommentChange }: Props) => {
	/* Hooks */
	const { user } = useUser();

	const dateParts: string[] = comment.created_at.split(' ');
	const datetime: DateTimeType = { date: dateParts[0], time: dateParts[1] };

	/* State */
	const [isEditing, setIsEditing] = useState<boolean>(false);

	/* Functions */
	const removeComment = () => {
		const payload: DeleteCommentPayload = {
			comment_user_id: comment.user_id,
			comment_id: comment.id,
		};

		DataService.threeD
			.deleteComment(payload)
			.then((res) => {
				console.log(res);
				deleteComment(res.data.comment_id);
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	};

	const editComment = () => {
		const payload: EditCommentPayload = {
			comment_id: comment.id,
			new_comment: comment.text,
		};

		DataService.threeD
			.editComment(payload)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='relative flex flex-row items-center rounded-lg border border-slate-300 mb-2 p-2'>
			<div className='flex flex-col mx-2'>
				<div className='text-slate-600'>{comment?.user?.name}</div>
				<div className='text-xs text-slate-500'>{datetime.date}</div>
				<div className='text-xs text-slate-500'>{datetime.time}</div>
			</div>
			{isEditing ? (
				<Input
					as='textarea'
					rows={2}
					onChange={(newValue: any) =>
						handleCommentChange(newValue, comment.id)
					}
					value={comment.text}
				/>
			) : (
				<div className='ml-8'>{comment.text}</div>
			)}
			{user.id === comment.user_id && (
				<>
					<div className='absolute right-2 top-2'>
						<Dropdown title={<MoreIcon />} noCaret>
							<Dropdown.Item onClick={() => setIsEditing(true)}>
								Edit
							</Dropdown.Item>
							<Dropdown.Item onClick={removeComment}>Delete</Dropdown.Item>
						</Dropdown>
					</div>
					<div className='absolute right-2 bottom-2'>
						<Button appearance='primary' onClick={editComment}>
							Edit
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default Comment;
