import { useState, useEffect } from 'react';
import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {
	const [shouldRender, setShouldRender] = useState(false);
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			setShouldRender(true);
		}
	}, [user]);

	return shouldRender ? (
		<div className='p-4'>
			<User username={user.username} fullName={user.fullName} />
			<Suggestions
				loggedInUserId={user.userId}
				following={user.following}
				loggedInUserDocId={user.docId}
			/>
		</div>
	) : null;
};

export default Sidebar;
