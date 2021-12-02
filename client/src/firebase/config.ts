// Database connection
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCv9oJerceWWfw7fp27ZF3rJOhcXIV0BWw",
    authDomain: "brocoder-601e5.firebaseapp.com",
    projectId: "brocoder-601e5",
    storageBucket: "brocoder-601e5.appspot.com",
    messagingSenderId: "617184168647",
    appId: "1:617184168647:web:934e4dc3e808414e594ce2",
    measurementId: "G-PC5VLHN70W"
};



// Initialize Firebase with a "default" Firebase project
const defaultProject = initializeApp(firebaseConfig);

// Option 1: Access Firebase services via the defaultProject variable
export const projectFirestore = getFirestore(defaultProject);


