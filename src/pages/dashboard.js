import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
	useEffect(() => {
		document.title = 'Instagram';
	}, []);

	return (
		<div className='bg-gray-background'>
			<Header />
			<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md'>
				<Timeline />
				<Sidebar />
			</div>
		</div>
	);
};

export default Dashboard;
