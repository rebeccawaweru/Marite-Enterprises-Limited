import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
const firebaseConfif = {
  apiKey: "AIzaSyCvD5XfqWa0G7DOHt2OIwQlF4qUzLoWW-Q",
  authDomain: "maritelimitedwebsite.firebaseapp.com",
  projectId: "maritelimitedwebsite",
  storageBucket: "maritelimitedwebsite.appspot.com",
  messagingSenderId: "29570145445",
  appId: "1:29570145445:web:52f7c2ef24da6dd99b814c",
  measurementId: "G-QKNL8BKC87",

  // apiKey: "AIzaSyCeAgWsra1NRI7aPi2M6Oy7IXA7aCvHc6w",
  // authDomain: "mariteltd-development.firebaseapp.com",
  // projectId: "mariteltd-development",
  // storageBucket: "mariteltd-development.appspot.com",
  // messagingSenderId: "246093339427",
  // appId: "1:246093339427:web:867c38467d2ed2aeeeca96",
  // measurementId: "G-4JT7GRS1XN",
};

//
firebase.initializeApp(firebaseConfif);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
