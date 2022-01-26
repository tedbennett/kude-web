import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcgInxPPFoLjSthQwdVD-e9Y0-T3etvtM",
  authDomain: "kude-679d8.firebaseapp.com",
  projectId: "kude-679d8",
  storageBucket: "kude-679d8.appspot.com",
  messagingSenderId: "218776495346",
  appId: "1:218776495346:web:b6ca65f89ee1aa9107dc6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
