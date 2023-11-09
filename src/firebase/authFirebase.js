import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyABTJUPhyN-f4arqjgK9tLUtRTmv-BLjyo",
    authDomain: "chat-clone-gpt.firebaseapp.com",
    projectId: "chat-clone-gpt",
    storageBucket: "chat-clone-gpt.appspot.com",
    messagingSenderId: "777240212975",
    appId: "1:777240212975:web:128dfee625e88b19e2b21a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const iniciarSesion = async (email, password) => await signInWithEmailAndPassword(auth, email, password)
