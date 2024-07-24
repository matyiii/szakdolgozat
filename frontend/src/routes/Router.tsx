import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const Router = () => {
	return (
		<Routes>
			{routes.map((route: routeType, index: number) => {
				return (
					<Route
						key={index}
						path={route.path}
						element={
							<Suspense fallback>
								<route.component />
							</Suspense>
						}
					></Route>
				);
			})}
		</Routes>
	);
};

export default Router;
