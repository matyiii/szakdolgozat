import { InternalAxiosRequestConfig } from 'axios';

const ApiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
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
