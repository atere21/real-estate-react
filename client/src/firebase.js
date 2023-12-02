// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-mern-ad439.firebaseapp.com",
  projectId: "ecommerce-mern-ad439",
  storageBucket: "ecommerce-mern-ad439.appspot.com",
  messagingSenderId: "98691006156",
  appId: "1:98691006156:web:260b923ce9e259fddc0c69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);