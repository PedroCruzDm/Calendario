import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);