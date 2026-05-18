
import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { 
     addDoc,
     collection,
     getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDmv1mvLiFS8q-97bAL3n0S1w1BWpinQG0",
  authDomain: "netflix-clone-a1ddb.firebaseapp.com",
  projectId: "netflix-clone-a1ddb",
  storageBucket: "netflix-clone-a1ddb.firebasestorage.app",
  messagingSenderId: "757163173520",
  appId: "1:757163173520:web:61bbad7765edc0377a5a15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password)
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
    } catch (error) {
        console.log(error);
        alert(error);
        
    }
}

const login = async (email, password)=> {
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};