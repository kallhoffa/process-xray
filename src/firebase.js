import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  { getFirestore } from  'firebase/firestore'
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyBsOMyfKC6DoppeF7QlKGcaav3Gk5x58kg",
    authDomain: "processxray.firebaseapp.com",
    databaseURL: "https://processxray-default-rtdb.firebaseio.com",
    projectId: "processxray",
    storageBucket: "processxray.appspot.com",
    messagingSenderId: "60985816000",
    appId: "1:60985816000:web:b9da151b0cb45806eb8e25",
    measurementId: "G-Y67H80EWV5"
  };

  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp(firebaseConfig);

export default firebase;
export const analytics = getAnalytics(app);
export const db = getFirestore();