// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
	getAuth,
	connectAuthEmulator,
	signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDtqFQx9kPoaxHjrY31-gM0QzfznKuhnr0",
  authDomain: "chatty-da6b6.firebaseapp.com",
  projectId: "chatty-da6b6",
  storageBucket: "chatty-da6b6.appspot.com",
  messagingSenderId: "470178547366",
  appId: "1:470178547366:web:ff807e011fd426f22a1667",
  measurementId: "G-LGDFL1XKF5"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0 ) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const auth = getAuth(firebaseConfig);
export { auth };
