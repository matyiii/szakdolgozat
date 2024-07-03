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
