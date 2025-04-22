import './App.css';
import React from 'react';
import Calendario from './components/Calendario/calendario.jsx';

function App() {
  return (
    <div className='App Calendario'>
      <div className='divisoria'>
        <Calendario />

        <div className='ferramentas'></div>
        
      </div>
    </div>
  );
}

export default App;