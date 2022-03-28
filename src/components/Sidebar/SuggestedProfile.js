import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toggleFollow, getUserByUserId } from '../../services/firebase';
import LoggedInUserContext from '../../context/logged-in-user';

const SuggestedProfile = ({
	profileDocId,
	username,
	profileId,
	loggedInUserId,
	loggedInUserDocId,
}) => {
	const [followed, setFollowed] = useState(false);
	const { setActiveUser } = useContext(LoggedInUserContext);

	const handleFollowUser = async () => {
		setFollowed(true);

		await toggleFollow(
			false,
			loggedInUserDocId,
			profileDocId,
			profileId,
			loggedInUserId,
		);
		const [user] = await getUserByUserId(loggedInUserId);
		setActiveUser(user);
	};

	return !followed ? (
		<div className='flex flex-row items-center align-items justify-between'>
			<div className='flex items-center justify-between '>
				<img
					src={`/images/avatars/${username}.jpg`}
					alt=''
					className='rounded-full w-8 flex mr-3'
				/>
				<Link to={`/p/${username}`}>
					<p className='font-bold text-sm'>{username}</p>
				</Link>
			</div>
			<button
				className='text-xs font-bold text-blue-medium'
				type='button'
				onClick={handleFollowUser}>
				Follow
			</button>
		</div>
	) : null;
};

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	loggedInUserId: PropTypes.string.isRequired,
	loggedInUserDocId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
