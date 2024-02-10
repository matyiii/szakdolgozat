import React from 'react';
import { routeType } from '@/shared';

const Welcome = React.lazy(() => import('@/pages/Welcome/Welcome'));
const Login = React.lazy(() => import('@/pages/Login/Login'));
const Register = React.lazy(() => import('@/pages/Register/Register'));

export const routes: routeType[] = [
	{
		path: '/',
		exact: true,
		component: Welcome,
		isPrivate: false
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		isPrivate: false
	},
	{
		path: '/register',
		exact: true,
		component: Register,
		isPrivate: false
	}
];
