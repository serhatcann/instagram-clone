import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';

import {
	getFirestore,
	getDocs,
	setDoc,
	doc,
	collection,
	query,
	where,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA-vNImCQ_oTw4OwnRtMyYsbougmxR1TYQ',
	authDomain: 'instagram-clone-7dc88.firebaseapp.com',
	projectId: 'instagram-clone-7dc88',
	storageBucket: 'instagram-clone-7dc88.appspot.com',
	messagingSenderId: '990561831155',
	appId: '1:990561831155:web:793b28d40207352c20cf86',
};

initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();
const { FieldValue } = firestore;

export {
	firestore,
	doc,
	getDocs,
	setDoc,
	FieldValue,
	auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	collection,
	query,
	where,
};
