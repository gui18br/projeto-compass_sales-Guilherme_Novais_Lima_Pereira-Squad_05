import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD1NTOFN8bv4DrvDr_NNuosovFf2jr-jDM",
  authDomain: "challenge-02-compassuol.firebaseapp.com",
  projectId: "challenge-02-compassuol",
  storageBucket: "challenge-02-compassuol.appspot.com",
  messagingSenderId: "344067324104",
  appId: "1:344067324104:web:7616d2c7b7626801574dfd"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)