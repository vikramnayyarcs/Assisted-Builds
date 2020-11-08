import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        /*ADD YOUR FIREBASE PROJECT'S CONFIG DETAILS HERE*/
});


  const db = firebaseApp.firestore();

  export default db;
