// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHsB8BSMAe25mw5HU1rKl_yyyGH4s5lwo",
  authDomain: "next-firebase-616c4.firebaseapp.com",
  projectId: "next-firebase-616c4",
  storageBucket: "next-firebase-616c4.appspot.com",
  messagingSenderId: "551916673109",
  appId: "1:551916673109:web:4d8da828041afb58155cdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const colRef = collection(db,"state")