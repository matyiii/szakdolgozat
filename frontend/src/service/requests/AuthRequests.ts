import { LoginPayload } from '@/shared';
import Api from '../Api';

export const AuthRequests = {
	login: (payload: LoginPayload) => {
		return Api.post('/login', {
			email: payload.email,
			password: payload.password
		});
	}
};
