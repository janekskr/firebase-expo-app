import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = JSON.parse(process.env.EXPO_PUBLIC_FIREBASE_CONFIG!)

const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db  = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage }