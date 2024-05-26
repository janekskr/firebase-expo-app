import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyC1fYfyf8jSLtjdW0GbcnwsYFPKEn0RE3s",
  authDomain: "cosmic-casino.firebaseapp.com",
  projectId: "cosmic-casino",
  storageBucket: "cosmic-casino.appspot.com",
  messagingSenderId: "405786556178",
  appId: "1:405786556178:web:bf58e3d34b17b75fe5a5cb",
  measurementId: "G-KXBHGYPS4G"
};

const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {auth, }