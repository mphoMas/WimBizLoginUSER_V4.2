import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth"
import "firebase/functions";

 
// Initialize Firestore
const firebase = firebase.initializeApp({
 
    apiKey: "AIzaSyBf4YWSbtdbbUBcxRJQ0RkOnUDYVNcD8uQ",
    authDomain: "testjs-fc621.firebaseapp.com",
    databaseURL: "https://testjs-fc621-default-rtdb.firebaseio.com",
    projectId: "testjs-fc621",
    storageBucket: "testjs-fc621.appspot.com",
    messagingSenderId: "631785812901",
    appId: "1:631785812901:web:80c3883855041aff562e4c",
    measurementId: "G-H8JZ58SJ27"
  });

// Make a reference to the Firestore database
const db = firestore.database();
  //make auth and firestore references

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const functions = firebase.functions();

  if(window.location.hostname.includes('localhost')) {
    auth.useEmulator( url, "http://localhost:9099");
    firestore.useEmulator( host, "http://localhost, port: 8080");
    functions.useEmulator( host, "http://localhost, port: 5001");
  }
 
  export default firebase;
