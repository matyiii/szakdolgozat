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
