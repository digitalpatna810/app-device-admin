// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCrPcknyZPsfgEyJXf8pjGqq3tLOs011PI",
    authDomain: "chat-50571.firebaseapp.com",
    projectId: "chat-50571",
    storageBucket: "chat-50571.firebasestorage.app",
    messagingSenderId: "965537970447",
    appId: "1:965537970447:web:6b7ba3455a120d8a8a267a",
    measurementId: "G-GER2BPW1V0"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
