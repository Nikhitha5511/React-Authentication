
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyC0NM766UR0E8CIzdecZlB8U1ErxXQWf4Q",
    authDomain: "authdemo-4230c.firebaseapp.com",
    projectId: "authdemo-4230c",
    storageBucket: "authdemo-4230c.appspot.com",
    messagingSenderId: "398497294305",
    appId: "1:398497294305:web:874262b5f0b99d435554a0",
    measurementId: "G-SYSVBNP8YH"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 
