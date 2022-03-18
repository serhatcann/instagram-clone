import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA-vNImCQ_oTw4OwnRtMyYsbougmxR1TYQ',
	authDomain: 'instagram-clone-7dc88.firebaseapp.com',
	projectId: 'instagram-clone-7dc88',
	storageBucket: 'instagram-clone-7dc88.appspot.com',
	messagingSenderId: '990561831155',
	appId: '1:990561831155:web:793b28d40207352c20cf86',
};

const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
