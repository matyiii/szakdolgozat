type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	username: string;
	email: string;
	password: string;
	password_confirmation: string;
};

type LikePayload = {
	model_id: number;
	is_liked: boolean;
};

type CommentPayload = {
	model_id: number;
	text: string;
};

type DeleteCommentPayload = {
	comment_user_id: number;
	comment_id: number;
};

type EditCommentPayload = {
	comment_id: number;
	new_comment: string;
};
