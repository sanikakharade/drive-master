// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBOx1K3Mf9xslm-nV0x5w-ofkLUQ6Hpx8c",
    authDomain: "drive-master-demo-d3795.firebaseapp.com",
    projectId: "drive-master-demo-d3795",
    storageBucket: "drive-master-demo-d3795.appspot.com",
    messagingSenderId: "907583141121",
    appId: "1:907583141121:web:5d711890c52fc095af1700",
    measurementId: "G-ZHEW6E5060",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;