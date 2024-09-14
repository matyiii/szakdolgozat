import Comment from '@/components/Comment/Comment';
import NewComment from '@/components/Comment/NewComment';

type Props = {
	modelId: number;
	comments: CommentType[];
	updateModel: any;
	deleteComment: any;
	changeComment: any;
	editComment: any;
};

const Comments = ({ comments, modelId, updateModel, deleteComment, changeComment, editComment }: Props) => {
	return (
		<div className='container flex flex-col bg-gray-100 rounded-lg p-2'>
			<NewComment modelId={modelId} updateModel={updateModel} />
			{Boolean(comments.length) && (
				<div className='bg-white rounded-lg p-2'>
					{comments.map((comment: CommentType) => (
						<Comment
							key={comment.id}
							comment={comment}
							deleteComment={deleteComment}
							handleCommentInputChange={changeComment}
							editComment={editComment}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Comments;
