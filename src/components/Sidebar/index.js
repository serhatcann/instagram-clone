import { useContext } from 'react';
import User from './User';
import Suggestions from './Suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

const Sidebar = () => {
	const { user: { docId = '', fullName, username, userId, following } = {} } =
		useContext(LoggedInUserContext);

	return (
		<div className='p-4'>
			<User username={username} fullName={fullName} />
			<Suggestions
				loggedInUserId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</div>
	);
};

export default Sidebar;
