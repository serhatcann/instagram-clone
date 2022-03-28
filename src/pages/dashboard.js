import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
import 'react-loading-skeleton/dist/skeleton.css';
import useUser from '../hooks/use-user';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../context/logged-in-user';

const Dashboard = ({ user: loggedInUser }) => {
	const { user, setActiveUser } = useUser(loggedInUser.uid);

	useEffect(() => {
		document.title = 'Instagram';
	}, []);

	return (
		<LoggedInUserContext.Provider value={{ user, setActiveUser }}>
			<div className='bg-gray-background'>
				<Header />
				<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md'>
					<Timeline />
					<Sidebar />
				</div>
			</div>
		</LoggedInUserContext.Provider>
	);
};

Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
};

export default Dashboard;
