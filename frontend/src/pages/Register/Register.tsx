import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Snackbar } from '@mui/material';

import { NavLink, useNavigate } from 'react-router-dom';
import DataService from '@/service/DataService';
import Copyright from '@/components/Copyright/Copyright';
import { store } from '@/store/store';
import { SET_USER } from '@/store/auth/authSlice';

import './Register.scss';

export default function SignUp() {
	/* Hooks */
	const navigate = useNavigate();

	/* States */
	const [isRegisterSuccesful, setIsRegisterSuccesful] = useState<boolean>(false);

	/* Functions */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			username: data.get('username'),
			email: data.get('email'),
			password: data.get('password'),
			password_confirmation: data.get('password_confirmation')
		};

		console.log(payload);

		DataService.auth
			.register(payload)
			.then((res) => {
				setIsRegisterSuccesful(true);
				console.log(res);

				const loginPayload = {
					email: res.data.user.email,
					password: payload.password
				};

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
				setIsRegisterSuccesful(true);
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				Sign up
			</Typography>
			<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='new-password'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='password_confirmation'
							label='Confirm Password'
							type='password'
							id='password_confirmation'
						/>
					</Grid>
				</Grid>
				<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
					Sign Up
				</Button>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<NavLink to='/login' className='link'>
							Already have an account? Sign in
						</NavLink>
					</Grid>
				</Grid>
			</Box>
			<Copyright />

			<Snackbar
				open={isRegisterSuccesful}
				autoHideDuration={5000}
				onClose={() => setIsRegisterSuccesful(false)}
			>
				<Alert variant='outlined' severity='success'>
					Registration successful!
				</Alert>
			</Snackbar>
		</Container>
	);
}
