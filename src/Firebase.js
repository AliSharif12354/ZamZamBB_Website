// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSjkBCrya8eQJQ8cB0U5DSFvmz2BOlsaw",
  authDomain: "zamzambandb.firebaseapp.com",
  projectId: "zamzambandb",
  storageBucket: "zamzambandb.appspot.com",
  messagingSenderId: "416313232998",
  appId: "1:416313232998:web:b51925454667476266a7a7",
  measurementId: "G-B7SBH1R9BQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth, app};