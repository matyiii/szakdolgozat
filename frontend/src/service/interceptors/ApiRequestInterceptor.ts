import { SET_LOADER } from '@/store/site/siteSlice';
import { store } from '@/store/store';
import { InternalAxiosRequestConfig } from 'axios';

const ApiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
	store.dispatch(SET_LOADER(true));

	const token = localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user') as string).token
		: false;

	if (token) {
		config.headers.set('Authorization', 'Bearer ' + token);
		config.headers.set('X-Requested-With', 'XMLHttpRequest');
	}

	return config;
};

export default ApiRequestInterceptor;
