import DataService from '@/service/DataService';
import { SET_USER } from '@/store/auth/authSlice';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuth = () => {
	/* Hooks */
	const location = useLocation();
	const navigate = useNavigate();

	/* Effects */
	useEffect(() => {
		DataService.auth
			.githubCallback(location.search)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data.user));
				store.dispatch(SET_USER(res.data.user));
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <div>OAuth</div>;
};

export default OAuth;
