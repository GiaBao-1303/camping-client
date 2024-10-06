import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_API_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_API_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_API_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_API_DATABASE,
    measurementId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default getFirestore(app);
