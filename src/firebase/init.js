import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjHUimrtR2B36SotiB9vjWKBYJSTbI_b0",
  authDomain: "smoothie-catalog.firebaseapp.com",
  databaseURL: "https://smoothie-catalog.firebaseio.com",
  projectId: "smoothie-catalog",
  storageBucket: "smoothie-catalog.appspot.com",
  messagingSenderId: "1069310756540",
  appId: "1:1069310756540:web:59afc690d31887ab"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
