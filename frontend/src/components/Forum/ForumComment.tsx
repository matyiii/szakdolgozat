import useUser from '@/hooks/useUser';
import DataService from '@/service/DataService';
import MoreIcon from '@rsuite/icons/More';
import { Button, Dropdown, Input } from 'rsuite';
import ApiError from '@/components/ApiErrror/ApiError';
import toast from 'react-hot-toast';
import { useState } from 'react';

type Props = {
	comment: TopicCommentType;
	deleteComment: any;
	editComment?: any;
};

const ForumComment = ({ comment, deleteComment, editComment }: Props) => {
	/* Hooks */
	const { user } = useUser();

	const dateParts: string[] = comment.created_at.split(' ');
	const datetime: { date: string; time: string } = { date: dateParts[0], time: dateParts[1] };

	/* State */
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedText, setEditedText] = useState<string>(comment.comment);

	/* Functions */
	const remove = () => {
		const payload: DeleteForumCommentPayload = {
			comment_id: comment.id,
		};

		DataService.forum
			.deleteComment(payload)
			.then((res) => {
				const { comment_id, message } = res.data;

				deleteComment(comment_id);
				toast.success(message);
			})
			.catch((err) => {
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	};

	const edit = () => {
		const payload: EditForumCommentPayload = {
			comment_id: comment.id,
			new_comment: editedText,
		};

		DataService.forum
			.editComment(payload)
			.then((res) => {
				const { new_comment, message } = res.data;

				editComment(new_comment);
				setIsEditing(false);
				toast.success(message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='relative flex flex-row items-center rounded-lg border border-slate-200 mb-2 p-2'>
			<div className='flex flex-col mx-2 min-w-28'>
				<div className='text-slate-600'>{comment?.user?.name}</div>
				<div className='text-xs text-slate-500'>{datetime.date}</div>
				<div className='text-xs text-slate-500'>{datetime.time}</div>
			</div>
			{isEditing ? (
				<Input as='textarea' rows={2} onChange={(value: any) => setEditedText(value)} value={editedText} />
			) : (
				<div className='ml-4'>{comment.comment}</div>
			)}
			{user.id === comment.user_id && (
				<div className='flex flex-col ml-auto'>
					{!isEditing && (
						<Dropdown title={<MoreIcon />} noCaret>
							<Dropdown.Item onClick={() => setIsEditing(true)}>Edit</Dropdown.Item>
							<Dropdown.Item onClick={remove}>Delete</Dropdown.Item>
						</Dropdown>
					)}
					{isEditing && (
						<div className='flex flex-col ml-1'>
							<Button appearance='primary' onClick={edit}>
								Save
							</Button>
							<Button onClick={() => setIsEditing(false)}>Cancel</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ForumComment;
