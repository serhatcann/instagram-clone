import { doc, limit } from 'firebase/firestore';
import {
	firestore,
	getDocs,
	updateDoc,
	arrayUnion,
	arrayRemove,
	collection,
	query,
	where,
} from '../lib/firebase';

// checks firestore if given (passed from sign up form) username is exists
export const doesUsernameExist = async (username) => {
	const q = query(
		collection(firestore, 'users'),
		where('username', '==', username),
	);
	const result = await getDocs(q);

	return result?.docs.length > 0 ? true : false;
};

// get user from the firestore where userId === userId (passed from the auth)
export const getUserByUserId = async (userId) => {
	const q = query(
		collection(firestore, 'users'),
		where('userId', '==', userId),
	);
	const result = await getDocs(q);
	const user = result?.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
};

// get suggested profiles for Suggestion component in the Sidebar
// filters current user and already following accounts
export const getSuggestedProfiles = async (userId, following) => {
	const q = query(collection(firestore, 'users'), limit(10));
	const result = await getDocs(q);

	return result?.docs
		.map((user) => ({ ...user.data(), docId: user.id }))
		.filter(
			(profile) =>
				profile.userId !== userId && !following.includes(profile.userId),
		);
};

// Below 2 functions does basically toggles the follow/unfollow for the user and target profile
export const updateLoggedInUserFollowing = async (
	loggedInUserDocId,
	profileId,
	isFollowingProfile,
) => {
	return await updateDoc(doc(firestore, 'users', loggedInUserDocId), {
		following: isFollowingProfile
			? arrayRemove(profileId)
			: arrayUnion(profileId),
	});
};

export const updateFollowedUserFollowers = async (
	profileDocId,
	loggedInUserId,
	isFollowingProfile,
) => {
	return await updateDoc(doc(firestore, 'users', profileDocId), {
		followers: isFollowingProfile
			? arrayRemove(loggedInUserId)
			: arrayUnion(loggedInUserId),
	});
};
