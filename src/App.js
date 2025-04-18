import './App.css';
import React from 'react';
import Calendario from './page/components/calendario/calendario.jsx';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  return (
    <div className='App Calendario'>
      <div className='divisoria'>
        <Calendario />

        <div className='ferramentas'>
        </div>
      </div>
    </div>
  );
}

const style = {
  App_Calendario: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    height: '100vh',
  },
};


//configuração do firebase
const firebaseConfig = {
  apiKey: "AIzaSyDaO2ENxmhrr1UamtoZgI3ujePMSaLT1qo",
  authDomain: "calendario-2cb0b.firebaseapp.com",
  databaseURL: "https://calendario-2cb0b-default-rtdb.firebaseio.com",
  projectId: "calendario-2cb0b",
  storageBucket: "calendario-2cb0b.firebasestorage.app",
  messagingSenderId: "660806699008",
  appId: "1:660806699008:web:bee36665775df88cde30e5",
  measurementId: "G-5PSCNRTERZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase initialized", app.name);

export default App;