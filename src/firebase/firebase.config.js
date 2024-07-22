// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmWX5wigffik9sMu2xnCG8uUB5j8tR_dU",
  authDomain: "gastapp-5d4e3.firebaseapp.com",
  projectId: "gastapp-5d4e3",
  storageBucket: "gastapp-5d4e3.appspot.com",
  messagingSenderId: "732456641960",
  appId: "1:732456641960:web:72e67e85c9193314e9a99d",
  measurementId: "G-TJTR8EHFTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)