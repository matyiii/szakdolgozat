import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import useUser from '@/hooks/useUser';

const Router = () => {
	const { user, isAdmin } = useUser();

	return (
		<Routes>
			{routes.map((route: RouteType, index: number) => {
				const element = (
					<Suspense fallback={<div>Loading...</div>}>
						<route.component />
					</Suspense>
				);

				// Redirect to login if the route is private and user is not authenticated
				if (route.isPrivate && !user.id) {
					return <Route key={index} path={route.path} element={<Navigate to='/login' />} />;
				}

				// If the route is admin and user is not an admin, redirect to /
				if (route.isAdmin && !isAdmin) {
					return <Route key={index} path={route.path} element={<Navigate to='/' />} />;
				}

				return <Route key={index} path={route.path} element={element} />;
			})}
		</Routes>
	);
};

export default Router;
