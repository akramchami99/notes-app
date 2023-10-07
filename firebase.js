
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCB7-tTE_ZnJ2swgc7Imz9FPzpjOXZ-wWk",
  authDomain: "react-notes-app-a87ff.firebaseapp.com",
  projectId: "react-notes-app-a87ff",
  storageBucket: "react-notes-app-a87ff.appspot.com",
  messagingSenderId: "60993472849",
  appId: "1:60993472849:web:64f9293e303c29b3abab70"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "Notes")