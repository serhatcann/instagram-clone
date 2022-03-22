import {
	firestore,
	getDocs,
	FieldValue,
	collection,
	query,
	where,
} from '../lib/firebase';

export const doesUsernameExist = async (username) => {
	const q = query(
		collection(firestore, 'users'),
		where('username', '==', username),
	);
	const result = await getDocs(q);

	return result.docs?.length > 0 ? true : false;
};
