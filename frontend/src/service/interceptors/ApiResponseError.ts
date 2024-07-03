import { SET_LOADER } from '@/store/site/siteSlice';
import { store } from '@/store/store';

const ApiResponseError = (error: any) => {
	store.dispatch(SET_LOADER(false));

	return Promise.reject(error);
};

export default ApiResponseError;
