import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import * as storage from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
storage.getStorage(app);
export const db = firestore.getFirestore(app);

export const authService = firebaseAuth.getAuth();
export const firebaseInstance = firebaseAuth;
export const firestoreInstance = firestore;
export const storageInstance = storage;
