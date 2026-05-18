
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
import { toast } from "react-toastify";


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
    //    toast.error(error.code.split('/')[1].split('-').join(" "));
       toast.error(error?.code?.split('/')[1]?.split('-').join(" ") ?? error.message)
    
    }
}

// const login = async (email, password)=> {
//     try {
//         signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//         console.log(error);
//         // toast.error(error.code.split('/')[1].split('-').join(" "))
//         toast.error(error?.code?.split('/')[1]?.split('-').join(" ") ?? error.message)
         
//     }
// }

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.code); // See exact error code
    switch(error.code) {
      case 'auth/invalid-credential':
        toast.error("Invalid email or password");
        break;
      case 'auth/user-not-found':
        toast.error("No account found with this email");
        break;
      case 'auth/wrong-password':
        toast.error("Incorrect password");
        break;
      default:
        toast.error(error.message);
    }
  }
}




const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};