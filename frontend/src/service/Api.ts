import axios from 'axios';

const Api = axios.create({
	baseURL: import.meta.env.MODE === 'prod' ? '/api' : import.meta.env.VITE_API
});

export default Api;
