
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-4244987249-1f3ac",
  "appId": "1:909303382851:web:6e55b575562205dae1e5f6",
  "storageBucket": "studio-4244987249-1f3ac.firebasestorage.app",
  "apiKey": "AIzaSyBeiC1fLWb-zoh_lSS1j-qal8f3LX5VelM",
  "authDomain": "studio-4244987249-1f3ac.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "909303382851"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

