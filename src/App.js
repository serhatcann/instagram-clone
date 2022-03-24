import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

function App() {
	const { user } = useAuthListener();
	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<p>Loading...</p>}>
					<Routes>
						<Route
							path={ROUTES.DASHBOARD}
							element={<ProtectedRoute user={user} />}>
							<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
						</Route>

						<Route path={ROUTES.LOGIN} element={<IsUserLoggedIn user={user} />}>
							<Route path={ROUTES.LOGIN} element={<Login />} />
						</Route>

						<Route
							path={ROUTES.SIGN_UP}
							element={<IsUserLoggedIn user={user} />}>
							<Route path={ROUTES.SIGN_UP} element={<SignUp />} />
						</Route>

						<Route path={ROUTES.PROFILE} element={<Profile />} />
						<Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
