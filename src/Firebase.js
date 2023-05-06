import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";  

const app = firebase.initializeApp({
  apiKey: "AIzaSyAjo3EMO9ArcvJ3Ch4g1yH_QqQQnIJIKiU",
  authDomain: "clone-drive-d77d7.firebaseapp.com",
  projectId: "clone-drive-d77d7",
  storageBucket: "clone-drive-d77d7.appspot.com",
  messagingSenderId: "876655333138",
  appId: "1:876655333138:web:0ab11ec406853e4f63edcb",
  measurementId: "G-MZFQKEX8T4"
});

const auth = app.auth();
const db = firebase.firestore();
const storage = firebase.storage();
var provider = new firebase.auth.GoogleAuthProvider();

export {provider, auth, db, storage};



