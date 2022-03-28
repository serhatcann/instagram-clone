import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

const usePhotos = (user) => {
	const [photos, setPhotos] = useState(null);

	useEffect(() => {
		const getTimelinePhotos = async () => {
			// does the user actually follow people?
			if (user?.following?.length > 0) {
				const followedUserPhotos = await getPhotos(user.userId, user.following);
				followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
				setPhotos(followedUserPhotos);
			}
		};

		getTimelinePhotos();
	}, [user?.following, user?.userId]);

	return { photos };
};

export default usePhotos;
