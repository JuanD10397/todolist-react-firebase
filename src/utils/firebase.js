// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2SanU9F4Q394ZFTbfRTuHEmitC8it0PQ",
    authDomain: "todo-list-ebd22.firebaseapp.com",
    projectId: "todo-list-ebd22",
    storageBucket: "todo-list-ebd22.appspot.com",
    messagingSenderId: "693320380341",
    appId: "1:693320380341:web:75535d25629e9f33a933fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;