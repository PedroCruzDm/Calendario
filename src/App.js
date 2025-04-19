import './App.css';
import React from 'react';
import Calendario from './page/components/calendario/calendario.jsx';
import { db, eventosRef} from './firebaseconfig.js';  // Importando o Firebase

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

export default App;