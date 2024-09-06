import React from 'react';

const Welcome = React.lazy(() => import('@/pages/Welcome/Welcome'));
const Login = React.lazy(() => import('@/pages/Login/Login'));
const Register = React.lazy(() => import('@/pages/Register/Register'));
const Upload = React.lazy(() => import('@/pages/Upload/Upload'));
const Discover = React.lazy(() => import('@/pages/Discover/Discover'));
const ThreeDModel = React.lazy(() => import('@/pages/ThreeDModel/ThreeDModel'));
const Profile = React.lazy(() => import('@/pages/Profile/Profile'));
const Search = React.lazy(() => import('@/pages/Search/Search'));

export const routes: RouteType[] = [
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
	{
		path: '/profile/:username',
		exact: true,
		component: Profile,
		isPrivate: false,
	},
	{
		path: '/search',
		exact: true,
		component: Search,
		isPrivate: false,
	},
];
