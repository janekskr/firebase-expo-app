// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1fYfyf8jSLtjdW0GbcnwsYFPKEn0RE3s",
  authDomain: "cosmic-casino.firebaseapp.com",
  projectId: "cosmic-casino",
  storageBucket: "cosmic-casino.appspot.com",
  messagingSenderId: "405786556178",
  appId: "1:405786556178:web:bf58e3d34b17b75fe5a5cb",
  measurementId: "G-KXBHGYPS4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);