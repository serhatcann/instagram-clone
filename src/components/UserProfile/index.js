import { useReducer, useEffect, useState } from 'react';
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
	const [profileExist, setProfileExist] = useState(false);

	const { username } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getProfileInfoAndPhotos = async (username) => {
			const [userFromFirebase] = await getUserByUsername(username);

			if (userFromFirebase) {
				setProfileExist(true);

				const photos = await getUserPhotosByUsername(userFromFirebase.userId);
				dispatch({
					profile: userFromFirebase,
					photosCollection: photos,
					followerCount: userFromFirebase.followers.length,
				});
			} else {
				navigate(ROUTES.NOT_FOUND);
			}
		};

		getProfileInfoAndPhotos(username);
	}, [navigate, username]);

	return profileExist ? (
		<>
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={dispatch}
			/>

			<Photos photos={photosCollection} />
		</>
	) : null;
};

export default UserProfile;
