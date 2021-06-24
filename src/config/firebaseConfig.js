import firebase from 'firebase/app';
import 'firebase/auth';
import config from './envConfig';

if (firebase.apps.length === 0) {
	firebase.initializeApp(config);
}

export const auth = firebase.auth();
