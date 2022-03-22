import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { onAuthStateChanged } from '../lib/firebase';

const useAuthListener = () => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('authUser')),
	);

	const { auth } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				// we have a user... therefore we can store the user in localStorage
				localStorage.setItem('authUser', JSON.stringify(authUser));
				setUser(authUser);
			} else {
				// we don't have an authUser, therefore clear the localStorage
				localStorage.removeItem('authUser');
				setUser(null);
			}
		});

		return listener;
	}, [auth]);

	return { user };
};

export default useAuthListener;
