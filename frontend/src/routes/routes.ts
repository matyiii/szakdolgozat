import React from 'react';
import { routeType } from '@/shared';

const Welcome = React.lazy(() => import('../pages/Welcome/Welcome'));

export const routes: routeType[] = [
	{
		path: '/',
		exact: true,
		component: Welcome,
		isPrivate: false
	}
];
