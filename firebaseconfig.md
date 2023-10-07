npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB7-tTE_ZnJ2swgc7Imz9FPzpjOXZ-wWk",
  authDomain: "react-notes-app-a87ff.firebaseapp.com",
  projectId: "react-notes-app-a87ff",
  storageBucket: "react-notes-app-a87ff.appspot.com",
  messagingSenderId: "60993472849",
  appId: "1:60993472849:web:64f9293e303c29b3abab70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);