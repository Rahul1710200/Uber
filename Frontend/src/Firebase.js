import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSoHYrQcB_sLVKuotLBt_lTS1gPgvnypk",
  authDomain: "uber-5c88e.firebaseapp.com",
  projectId: "uber-5c88e",
  storageBucket: "uber-5c88e.firebasestorage.app", // Correct as per Firebase docs
  messagingSenderId: "630790817512",
  appId: "1:630790817512:web:2737847853018d95356b5d",
  measurementId: "G-JT5SG6KMMT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
