import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBPceFc6yaHVIaGV91IUHWqIjoef0hVI1k",
  authDomain: "vcation-property-rent.firebaseapp.com",
  projectId: "vcation-property-rent",
  storageBucket: "vcation-property-rent.appspot.com",
  messagingSenderId: "383148702770",
  appId: "1:383148702770:web:9150f31d843d8f86d1502b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);