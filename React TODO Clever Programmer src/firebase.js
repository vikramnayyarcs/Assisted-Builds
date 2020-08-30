import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAmkoOgKCYXGsNR-afwnAVSvCJtKAa7ypg",
        authDomain: "compandcodetodocpf.firebaseapp.com",
        databaseURL: "https://compandcodetodocpf.firebaseio.com",
        projectId: "compandcodetodocpf",
        storageBucket: "compandcodetodocpf.appspot.com",
        messagingSenderId: "426730450340",
        appId: "1:426730450340:web:f5ddd5b9392eb697c16531",
        measurementId: "G-5SCXQZGZBD"
});


  const db = firebaseApp.firestore();

  export default db;