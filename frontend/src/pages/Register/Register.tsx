import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DataService from '@/service/DataService';
import { store } from '@/store/store';
import { SET_USER } from '@/store/auth/authSlice';
import { RegisterPayload } from '@/shared';
import { Button, ButtonToolbar, Form, Panel } from 'rsuite';
import toast from 'react-hot-toast';
import ApiError from '@/components/ApiErrror/ApiError';

const Register = () => {
	/* Hooks */
	const navigate = useNavigate();

	/* States */
	const [payload, setPayload] = useState<RegisterPayload>({
		username: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

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
		console.log(payload);

		DataService.auth
			.register(payload)
			.then((res) => {
				const loginPayload = {
					email: res.data.user.email,
					password: payload.password,
				};

				toast.success('Register successfully!');

				// login user and redirect
				DataService.auth
					.login(loginPayload)
					.then((res) => {
						localStorage.setItem('user', JSON.stringify(res.data.user));
						store.dispatch(SET_USER(res.data.user));
						navigate('/');
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	};

	return (
		<Panel bordered className='flex justify-center'>
			<h1 className='text-2xl font-medium px-2 pb-2'>Sign up</h1>
			<Form className='p-2'>
				<Form.Group controlId='username'>
					<Form.ControlLabel>Username</Form.ControlLabel>
					<Form.Control name='username' onChange={handleInputChange} value={payload.username} />
				</Form.Group>
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
				<Form.Group controlId='password_confirmation'>
					<Form.ControlLabel>Confirm Password</Form.ControlLabel>
					<Form.Control
						name='password_confirmation'
						type='password'
						onChange={handleInputChange}
						value={payload.password_confirmation}
					/>
				</Form.Group>
				<Form.Group>
					<ButtonToolbar>
						<NavLink to='/login'>
							<Button appearance='link'>Already have an account? Sign in</Button>
						</NavLink>
						<Button appearance='primary' onClick={handleSubmit}>
							Sign up
						</Button>
					</ButtonToolbar>
				</Form.Group>
			</Form>
		</Panel>
	);
};

export default Register;
