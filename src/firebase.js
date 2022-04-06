import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBlyZF8FuLFpsFXQH85WucnADy6nbqVURY",
  authDomain: "final-f8fe1.firebaseapp.com",
  projectId: "final-f8fe1",
  storageBucket: "final-f8fe1.appspot.com",
  messagingSenderId: "708397125471",
  appId: "1:708397125471:web:84e5f1a53d1033a58cb0ea"
};

const app = initializeApp(firebaseConfig);
export {getAuth, createUserWithEmailAndPassword}