import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCH8byN-m4sFCogZ_Piwo2fTHvSpc3Gpeo',
    authDomain: 'neoversity-8692a.firebaseapp.com',
    databaseURL: 'https://neoversity-8692a.firebaseio.com',
    projectId: 'neoversity-8692a',
    storageBucket: 'gs://neoversity-8692a.firebasestorage.app',
    messagingSenderId: '802776631810',
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  export const db = getFirestore(app);
  export const storage = getStorage(app); 