import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC7ulHKkVcRfihppEW6ggHBhbwwhh67iIY",
    authDomain: "fir-react-2e2ff.firebaseapp.com",
    projectId: "fir-react-2e2ff",
    storageBucket: "fir-react-2e2ff.appspot.com",
    messagingSenderId: "774414504042",
    appId: "1:774414504042:web:13a2b651ef27f99860ba13"
  };
  
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)

// firebase.initializeApp(firebaseConfig);
  
// export default firebase


