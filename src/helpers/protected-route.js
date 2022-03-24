import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const ProtectedRoute = ({ user }) => {
	return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

ProtectedRoute.propTypes = {
	user: PropTypes.object,
};

export default ProtectedRoute;
