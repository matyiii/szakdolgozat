import ApiError from '@/components/ApiErrror/ApiError';
import DataService from '@/service/DataService';
import { SET_USER } from '@/store/auth/authSlice';
import { fetchCategories } from '@/store/site/siteSlice';
import { store } from '@/store/store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form, Panel } from 'rsuite';
import githubMark from '@/assets/github-mark.svg';
import googleLogo from '@/assets/googe_logo.svg';

const Login = () => {
	/* Hooks */
	const navigate = useNavigate();

	/* State */
	const [googleLoginUrl, setGoogleLoginUrl] = useState(null);
	const [githubLoginUrl, setGithubLoginUrl] = useState(null);
	const [payload, setPayload] = useState<LoginPayload>({
		email: '',
		password: '',
	});

	/* Effects */
	useEffect(() => {
		DataService.auth
			.googleLogin()
			.then((res) => {
				console.log(res.data);
				setGoogleLoginUrl(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		DataService.auth
			.githubLogin()
			.then((res) => {
				console.log(res.data);
				setGithubLoginUrl(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	/* Functions */
	const handleInputChange = (value: any, e: any) => {
		const { name } = e.currentTarget;
		setPayload((prevState: any) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleSubmit = () => {
		DataService.auth
			.login(payload)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data.user));
				store.dispatch(SET_USER(res.data.user));
				store.dispatch(fetchCategories());
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	};

	return (
		<Panel bordered className='flex justify-center bg-white rounded-lg shadow-lg'>
			<h1 className='text-2xl font-medium px-2 pb-2'>Log in</h1>
			<Form className='p-2'>
				<Form.Group controlId='email'>
					<Form.ControlLabel>Email</Form.ControlLabel>
					<Form.Control name='email' onChange={handleInputChange} value={payload.email} />
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.ControlLabel>Password</Form.ControlLabel>
					<Form.Control name='password' type='password' onChange={handleInputChange} value={payload.password} />
				</Form.Group>
				<Form.Group>
					<ButtonToolbar>
						<NavLink to='/register'>
							<Button appearance='link' className=''>
								Don't have an account? Sign Up
							</Button>
						</NavLink>
						<Button appearance='primary' onClick={handleSubmit}>
							Sign in
						</Button>
					</ButtonToolbar>
					<div className='my-4'>
						{githubLoginUrl != null && (
							<a
								href={githubLoginUrl}
								className='flex w-full items-center justify-center px-6 py-2 mb-2 text-white bg-gray-500 hover:bg-gray-400 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out'
							>
								<img src={githubMark} alt='GitHub' className='w-5 h-5 mr-2' />
								GitHub Sign In
							</a>
						)}

						{/*{googleLoginUrl != null && (
							<a
								href={googleLoginUrl}
								className='flex w-full items-center justify-center px-6 py-2 mt-2 text-white bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out'
							>
								<img src={googleLogo} alt='Google' className='w-5 h-5 mr-2' />
								Google Sign In
							</a>
						)}*/}
					</div>
				</Form.Group>
			</Form>
		</Panel>
	);
};

export default Login;
