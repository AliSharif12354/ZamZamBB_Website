// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"
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
const files = getStorage(app)

const Flyers = ref(files, "Images/Flyers/");
const Other = ref(files, "Images/Other/")

function updateFlyers() {
  return new Promise((resolve, reject) => {
    listAll(Flyers).then((res) => {
      const URLs = [];
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          if (URLs.indexOf(url) === -1) {
            URLs.push(url);
          }
          if (URLs.length === res.items.length) {
            resolve(URLs);
          }
        }).catch((error) => {
          reject(error);
        });
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

function updateOther() {
  return new Promise((resolve, reject) => {
    listAll(Other).then((res) => {
      const URLs = [];
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          if (URLs.indexOf(url) === -1) {
            URLs.push(url);
          }
          if (URLs.length === res.items.length) {
            resolve(URLs);
          }
        }).catch((error) => {
          reject(error);
        });
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

export { auth, app, files, updateFlyers, updateOther};