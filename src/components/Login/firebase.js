import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCKeFj5sG04B77mhvoWddhlbjUt55BlVtk",
    authDomain: "hackathonlogin-95995.firebaseapp.com",
    databaseURL: "https://hackathonlogin-95995.firebaseio.com",
    projectId: "hackathonlogin-95995",
    storageBucket: "hackathonlogin-95995.appspot.com",
    messagingSenderId: "575902473122",
    appId: "1:575902473122:web:a4d40f4baa57b9b21db0fb",
    measurementId: "G-CRLMYF2DB6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };