import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_Firebase_APIKey,
    authDomain: "negems-5c95b.firebaseapp.com",
    projectId: "negems-5c95b",
    storageBucket: "negems-5c95b.firebasestorage.app",
    messagingSenderId: "669940261043",
    appId: "1:669940261043:web:cafa554e7b2c8206ae90c6",
    measurementId: "G-L2R86NLZ73"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);