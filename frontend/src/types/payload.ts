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
