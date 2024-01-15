import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";  

const app = firebase.initializeApp({
  apiKey: "AIzaSyAfiPGn2vNKcrHpayHMLf_Ru7ddeMtVh94",
  authDomain: "clone-drive-a0215.firebaseapp.com",
  projectId: "clone-drive-a0215",
  storageBucket: "clone-drive-a0215.appspot.com",
  messagingSenderId: "99212854982",
  appId: "1:99212854982:web:abd1115f7a5ddbd87b39c7"
});

const auth = app.auth();
const db = firebase.firestore();
const storage = firebase.storage();
var provider = new firebase.auth.GoogleAuthProvider();

export {provider, auth, db, storage};



