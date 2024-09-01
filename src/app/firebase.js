// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXjn196hqc8WtV80xTIX-uM_HNZgXFOXQ",
  authDomain: "nextjs-auth-2d624.firebaseapp.com",
  projectId: "nextjs-auth-2d624",
  storageBucket: "nextjs-auth-2d624.appspot.com",
  messagingSenderId: "338014880543",
  appId: "1:338014880543:web:950b2b435030cc1b00262a",
  measurementId: "G-MENHL5LKBR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
