import React from 'react';
import './App.css';
import OverviewFlow from './OverviewFlow';
import '@fontsource/roboto';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsOMyfKC6DoppeF7QlKGcaav3Gk5x58kg",
  authDomain: "processxray.firebaseapp.com",
  projectId: "processxray",
  storageBucket: "processxray.appspot.com",
  messagingSenderId: "60985816000",
  appId: "1:60985816000:web:b9da151b0cb45806eb8e25",
  measurementId: "G-Y67H80EWV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        ProcessXray
      </header>
      <div className="App-content">
        <OverviewFlow />
      </div>
    </div>
  );
}

export default App;
