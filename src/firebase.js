// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARHkuG5ogbBrWtgRqkT349CX98I9xW1V8",
  authDomain: "todo-app-24fca.firebaseapp.com",
  projectId: "todo-app-24fca",
  storageBucket: "todo-app-24fca.appspot.com",
  messagingSenderId: "799297041190",
  appId: "1:799297041190:web:b87a3756af78704f72c7e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)