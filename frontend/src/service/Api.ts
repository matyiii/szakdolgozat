import axios from 'axios';
import ApiRequestInterceptor from './interceptors/ApiRequestInterceptor';
import ApiRequestError from './interceptors/ApiRequestError';

const Api = axios.create({
    baseURL:
        import.meta.env.MODE === 'prod' ? '/api' : import.meta.env.VITE_API,
    withCredentials: true,
});

Api.interceptors.request.use(ApiRequestInterceptor, ApiRequestError);

export default Api;
