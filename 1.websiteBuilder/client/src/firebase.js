// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-c0d3c.firebaseapp.com",
  projectId: "genwebai-c0d3c",
  storageBucket: "genwebai-c0d3c.firebasestorage.app",
  messagingSenderId: "697497563930",
  appId: "1:697497563930:web:216f22fec792ba17deb2a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth,provider}
