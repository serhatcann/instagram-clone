import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {
	const {
		user: { docId, fullName, username, userId: loggedInUserId, following },
	} = useUser();

	return (
		<div className='p-4'>
			<User username={username} fullName={fullName} />
			<Suggestions
				loggedInUserId={loggedInUserId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</div>
	);
};

export default Sidebar;
