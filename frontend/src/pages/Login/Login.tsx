import ApiError from '@/components/ApiErrror/ApiError';
import DataService from '@/service/DataService';
import { LoginPayload } from '@/shared';
import { SET_USER } from '@/store/auth/authSlice';
import { store } from '@/store/store';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form, Panel } from 'rsuite';

const Login = () => {
	/* Hooks */
	const navigate = useNavigate();

	/* State */
	const [payload, setPayload] = useState<LoginPayload>({
		email: 'admin@admin.com',
		password: 'admin123'
	});

	/* Functions */
	const handleInputChange = (value: any, e: any) => {
		const { name } = e.currentTarget;
		setPayload((prevState: any) => {
			return {
				...prevState,
				[name]: value
			};
		});
	};

	const handleSubmit = () => {
		DataService.auth
			.login(payload)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data.user));
				store.dispatch(SET_USER(res.data.user));
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000
				});
			});
	};

	return (
		<Panel bordered className='flex justify-center'>
			<h1 className='text-2xl font-medium px-2 pb-2'>Log in</h1>
			<Form className='p-2'>
				<Form.Group controlId='email'>
					<Form.ControlLabel>Email</Form.ControlLabel>
					<Form.Control name='email' onChange={handleInputChange} value={payload.email} />
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.ControlLabel>Password</Form.ControlLabel>
					<Form.Control
						name='password'
						type='password'
						onChange={handleInputChange}
						value={payload.password}
					/>
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
				</Form.Group>
			</Form>
		</Panel>
	);
};

export default Login;
