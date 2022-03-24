import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const IsUserLoggedIn = ({ user }) => {
	return !user ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} />;
};

IsUserLoggedIn.propTypes = {
	user: PropTypes.object,
};

export default IsUserLoggedIn;
