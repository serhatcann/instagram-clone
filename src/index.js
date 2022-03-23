import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { auth } from './lib/firebase';
import './styles/app.css';

ReactDOM.render(
	<FirebaseContext.Provider value={{ auth }}>
		<App />
	</FirebaseContext.Provider>,
	document.getElementById('root'),
);
