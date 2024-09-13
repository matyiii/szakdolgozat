type RouteType = {
	path: string;
	exact?: boolean;
	component: React.FC | any;
	isPrivate: boolean;
	roles?: string[];
	type?: string;
};

type UserType = {
	id: number | null;
	name: string | null;
	email: string | null;
	token?: string | null;
};

type CategoryType = {
	id?: number;
	name: string;
	updated_at?: string;
	created_at?: string;
};

type ImageType = {
	id: number;
	name: string;
	path: string;
	extension: string;
	three_d_model_id: number;
	created_at: string;
	updated_at: string;
};

type FileType = {
	id: number;
	name: string;
	path: string;
	extension: string;
	three_d_model_id: number;
	created_at: string;
	updated_at: string;
};

type ThreeDModelType = {
	id: number;
	name: string;
	is_banned: boolean;
	is_highlighted: boolean;
	like_count: number;
	download_count: number;
	user_id: number;
	category_id: number;
	created_at: string;
	updated_at: string;
	user: UserType;
	category: CategoryType;
	images: ImageType[];
	files: FileType[];
	is_liked?: boolean;
	comments: CommentType[];
};

type CommentType = {
	id: number;
	user_id: number;
	user?: UserType;
	three_d_model_id: number;
	text: string;
	created_at: string;
	updated_at: string;
};

type DateTimeType = {
	date: string;
	time: string;
};

type ForumType = {
	id: number;
	name: string;
	description?: string;
	created_at: string;
	updated_at: string;
	topics?: TopicType[];
};

type TopicType = {
	id?: number;
	forum_id?: number;
	user_id?: number;
	title: string;
	description: string;
	created_at?: string;
	updated_at?: string;
	user?: UserType;
	forum?: ForumType;
	comments?: TopicCommentType[];
	last_comment?: TopicCommentType;
};

type TopicCommentType = {
	id: number;
	topic_id: number;
	user_id: number;
	comment: string;
	created_at: string;
	updated_at: string;
	user?: UserType;
	topic?: TopicType;
};
