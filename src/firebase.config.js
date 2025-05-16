
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTkTW1Ured2UyvxnHwLVGjd0eoJQ15-uA",
  authDomain: "chattingapps-3164e.firebaseapp.com",
  projectId: "chattingapps-3164e",
  storageBucket: "chattingapps-3164e.firebasestorage.app",
  messagingSenderId: "343305691706",
  appId: "1:343305691706:web:6277d110a9698a34e1cb03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app}
export {auth}