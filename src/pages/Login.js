import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

const Login = () => {
	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);

	const [emailAdress, setEmailAdress] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');
	const isInvalid = password === '' || emailAdress === '';

	const handleLogin = () => {};

	useEffect(() => {
		document.title = 'Login - Instagram';
	}, []);

	return <div>Login Page</div>;
};

export default Login;
