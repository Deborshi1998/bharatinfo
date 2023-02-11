// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsU1hrDHx5y-218jTOhmIDENtkm0C133E",
  authDomain: "bharat-info.firebaseapp.com",
  projectId: "bharat-info",
  storageBucket: "bharat-info.appspot.com",
  messagingSenderId: "904566211268",
  appId: "1:904566211268:web:b29bab1cbef9aa23447f91",
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);