import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

initializeApp({
  apiKey: "AIzaSyCq_KBj3TnkybHAyB9-QWh8AZYa2NS9yWc",
  authDomain: "vue-login-practice-85d2d.firebaseapp.com",
  projectId: "vue-login-practice-85d2d",
  storageBucket: "vue-login-practice-85d2d.appspot.com",
  messagingSenderId: "216635612042",
  appId: "1:216635612042:web:2820bb0c28fb2293644673",
});

// utils
const db = getFirestore();
const auth = getAuth();

// export utils/refs
export { db, auth };
