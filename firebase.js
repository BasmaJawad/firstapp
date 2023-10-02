// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6Nm_m28vK7i0Boq-CVtEUxdhRvM7hMaU",
  authDomain: "memorylane-8bba3.firebaseapp.com",
  projectId: "memorylane-8bba3",
  storageBucket: "memorylane-8bba3.appspot.com",
  messagingSenderId: "372582560490",
  appId: "1:372582560490:web:a58face0e31505c986dd93",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);
