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

// checks firestore if given (passed from profile page) and returns user
export const getUserByUsername = async (username) => {
	const q = query(
		collection(firestore, 'users'),
		where('username', '==', username),
	);
	const result = await getDocs(q);

	return result?.docs.map((item) => ({ ...item.data(), docId: item.id }));
};

export const getUserPhotosByUsername = async (userId) => {
	const q = query(
		collection(firestore, 'photos'),
		where('userId', '==', userId),
	);
	const result = await getDocs(q);
	const photos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));
	return photos;
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
	await updateDoc(doc(firestore, 'users', loggedInUserDocId), {
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
	await updateDoc(doc(firestore, 'users', profileDocId), {
		followers: isFollowingProfile
			? arrayRemove(loggedInUserId)
			: arrayUnion(loggedInUserId),
	});
};

// get Timeline photos with the details usernames and likes
// userFollowedPhotos gets the photo document of following people
//
// photosWithUserDetails maps the photos and from userId checks if its liked or not by our user
// fetches username from userId then returns all of them
export const getPhotos = async (userId, following) => {
	const q = query(
		collection(firestore, 'photos'),
		where('userId', 'in', following),
	);
	const result = await getDocs(q);

	const userFollowedPhotos = result?.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const photosWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			let userLikedPhoto = false;
			if (photo.likes.includes(userId)) {
				userLikedPhoto = true;
			}
			const user = await getUserByUserId(photo.userId);
			const { username } = user[0];
			return { username, ...photo, userLikedPhoto };
		}),
	);
	return photosWithUserDetails;
};

export const toggleLikesOfPhoto = async (isLiked, docId, userId) => {
	await updateDoc(doc(firestore, 'photos', docId), {
		likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
	});
};

export const postCommentOnPhoto = async (displayName, docId, comment) => {
	await updateDoc(doc(firestore, 'photos', docId), {
		comments: arrayUnion({ displayName, comment }),
	});
};
