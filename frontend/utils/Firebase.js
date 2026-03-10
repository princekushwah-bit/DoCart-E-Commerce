import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Nayi configuration jo tumhe mili hai
const firebaseConfig = {
  apiKey: "AIzaSyB7rmmPmBCmm90pJgPG3_cirLes4s0Q2UA",
  authDomain: "docart-d84b9.firebaseapp.com",
  projectId: "docart-d84b9",
  storageBucket: "docart-d84b9.firebasestorage.app",
  messagingSenderId: "1075958708628",
  appId: "1:1075958708628:web:bc2fe35aeb6ebedc533781",
  measurementId: "G-K925HZ8THX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ye exports zaroori hain login ke liye
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };