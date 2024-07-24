type Props = {
	comment: CommentType;
};

const Comment = ({ comment }: Props) => {
	return (
		<div>
			<div>{comment.message}</div>
		</div>
	);
};

export default Comment;
