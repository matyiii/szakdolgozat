export interface routeType {
	path: string;
	exact?: boolean;
	component: React.FC | any;
	isPrivate: boolean;
	roles?: string[];
	type?: string;
}

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

type User = {
	id: number | null;
	name: string | null;
	email: string | null;
	token: string | null;
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
	user_id: number;
	category_id: number;
	created_at: string;
	updated_at: string;
	user: User;
	category: CategoryType;
	images: ImageType[];
	files: FileType[];
};
