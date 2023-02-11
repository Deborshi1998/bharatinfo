// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APP_APIKEY,
  authDomain: "bharat-info.firebaseapp.com",
  projectId: "bharat-info",
  storageBucket: "bharat-info.appspot.com",
  messagingSenderId: process.env.APP_MESSAGINGSENDERID,
  appId: process.env.APP_APPID,
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);