import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Photos from './Photos';
import {
	getUserByUsername,
	getUserPhotosByUsername,
} from '../../services/firebase';
import * as ROUTES from '../../constants/routes';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
	profile: {},
	photosCollection: [],
	followerCount: 0,
};

const UserProfile = () => {
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const { username } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getProfileInfoAndPhotos = async (username) => {
			const [user] = await getUserByUsername(username);

			if (user) {
				const photos = await getUserPhotosByUsername(user.userId);
				dispatch({
					profile: user,
					photosCollection: photos,
					followerCount: user.followers.length,
				});
			} else {
				navigate(ROUTES.NOT_FOUND);
			}
		};

		getProfileInfoAndPhotos(username);
	}, [navigate, username]);

	return (
		<>
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={dispatch}
			/>

			<Photos photos={photosCollection} />
		</>
	);
};

UserProfile.propTypes = {
	user: PropTypes.shape({
		dateCreated: PropTypes.number.isRequired,
		emailAddress: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		fullName: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
};

export default UserProfile;
