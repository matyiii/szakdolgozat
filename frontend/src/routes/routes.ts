import React from 'react';
import { routeType } from '@/shared';

const Welcome = React.lazy(() => import('@/pages/Welcome/Welcome'));
const Login = React.lazy(() => import('@/pages/Login/Login'));
const Register = React.lazy(() => import('@/pages/Register/Register'));
const Upload = React.lazy(() => import('@/pages/Upload/Upload'));
const Discover = React.lazy(() => import('@/pages/Discover/Discover'));
const ThreeDModel = React.lazy(() => import('@/pages/ThreeDModel/ThreeDModel'));

export const routes: routeType[] = [
	{
		path: '/',
		exact: true,
		component: Welcome,
		isPrivate: false,
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		isPrivate: false,
	},
	{
		path: '/register',
		exact: true,
		component: Register,
		isPrivate: false,
	},
	{
		path: '/upload',
		exact: true,
		component: Upload,
		isPrivate: false,
	},
	{
		path: '/discover',
		exact: true,
		component: Discover,
		isPrivate: false,
	},
	{
		path: '/models/:modelId',
		exact: true,
		component: ThreeDModel,
		isPrivate: false,
	},
];
