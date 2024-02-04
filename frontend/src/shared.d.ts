export interface routeType {
	path: string;
	exact?: boolean;
	component: React.FC | any;
	isPrivate: boolean;
	roles?: string[];
	type?: string;
}

type LoginPayload = {
	email: FormDataEntryValue | any;
	password: FormDataEntryValue | any;
};
