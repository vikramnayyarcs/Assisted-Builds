import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //FireBase Config Data goes HERE!!!
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
