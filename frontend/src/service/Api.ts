import axios from 'axios';
import ApiRequestInterceptor from './interceptors/ApiRequestInterceptor';
import ApiRequestError from './interceptors/ApiRequestError';
import ApiResponseInterceptor from './interceptors/ApiResponseInterceptor';
import ApiResponseError from './interceptors/ApiResponseError';

const Api = axios.create({
    baseURL:
        import.meta.env.MODE === 'prod' ? '/api' : import.meta.env.VITE_API,
    withCredentials: true,
});

Api.interceptors.request.use(ApiRequestInterceptor, ApiRequestError);
Api.interceptors.response.use(ApiResponseInterceptor, ApiResponseError);

export default Api;
