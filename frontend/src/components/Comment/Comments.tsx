import Comment from '@/components/Comment/Comment';
import NewComment from '@/components/Comment/NewComment';

type Props = {
	modelId: number;
	comments: CommentType[];
	updateModel: any;
	deleteComment: any;
	changeComment: any;
};

const Comments = ({
	comments,
	modelId,
	updateModel,
	deleteComment,
	changeComment,
}: Props) => {
	return (
		<div className='container flex flex-col w-screen bg-purple-200 rounded-lg p-2'>
			<NewComment modelId={modelId} updateModel={updateModel} />
			<div className='bg-white w-1/2 rounded-lg p-2'>
				{comments.map((comment: CommentType) => (
					<Comment
						key={comment.id}
						comment={comment}
						deleteComment={deleteComment}
						handleCommentChange={changeComment}
					/>
				))}
			</div>
		</div>
	);
};

export default Comments;
