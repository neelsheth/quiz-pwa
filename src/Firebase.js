
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithPhoneNumber , signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDFacHgZ5c0gyr2zq-59C9cycM6SBq35w0",
    authDomain: "quiz-fcca4.firebaseapp.com",
    projectId: "quiz-fcca4",
    storageBucket: "quiz-fcca4.appspot.com",
    messagingSenderId: "318960592761",
    appId: "1:318960592761:web:f76f6b31a9f9b1ed8231a8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// export const provider = new firebase.auth.FacebookAuthProvider()
