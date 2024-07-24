import Api from '../Api';

export const AuthRequests = {
	login: (payload: LoginPayload) => {
		return Api.post('/login', {
			email: payload.email,
			password: payload.password,
		});
	},

	register: (payload: RegisterPayload) => {
		return Api.post('/register', {
			name: payload.username,
			email: payload.email,
			password: payload.password,
			password_confirmation: payload.password_confirmation,
		});
	},

	logout: () => {
		return Api.post('/logout');
	},
};
