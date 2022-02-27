import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAWYkNszOheIpdlNfJgyHGTT5hcxWtKSBU",
    authDomain: "instagram-clone-73f65.firebaseapp.com",
    projectId: "instagram-clone-73f65",
    storageBucket: "instagram-clone-73f65.appspot.com",
    messagingSenderId: "625573961352",
    appId: "1:625573961352:web:893637c47f7037d280493d"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = app.firestore();

  export{auth,db};