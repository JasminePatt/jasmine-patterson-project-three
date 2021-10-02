// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB79Yptx6hGvquLDCXWfbxuUPpktVSoJAo",
    authDomain: "jasmine-patterson-project-3.firebaseapp.com",
    projectId: "jasmine-patterson-project-3",
    storageBucket: "jasmine-patterson-project-3.appspot.com",
    messagingSenderId: "781894367175",
    appId: "1:781894367175:web:aac252763820a65d830be2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtime = getDatabase(app);

// Lastly, export
export default realtime;
