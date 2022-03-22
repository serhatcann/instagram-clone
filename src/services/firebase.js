import {
	firestore,
	getDocs,
	FieldValue,
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

	return result.docs?.length > 0 ? true : false;
};

// get user from the firestore where userId === userId (passed from the auth)
export const getUserByUserId = async (userId) => {
	const q = query(
		collection(firestore, 'users'),
		where('userId', '==', userId),
	);
	const result = await getDocs(q);
	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
};
