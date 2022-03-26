import React from 'react';
import UserProfile from '../components/UserProfile';
import Header from '../components/Header';

const Profile = () => {
	return (
		<div className='bg-gray-background'>
			<Header />
			<div className='mx-auto max-w-screen-lg'>
				<UserProfile />
			</div>
		</div>
	);
};

export default Profile;
