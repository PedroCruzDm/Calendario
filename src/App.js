import './App.css';
import React from 'react';
import Calendario from './page/components/calendario/calendario.jsx';
import {Header} from './page/components/Header/index.jsx';

function App() {
  return (
    <div className='App Calendario'>
      <div className='divisoria'>
        <Calendario />
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
  App_Calendario_Header: {
    backgroundColor: 'blue',
    width: '100%',
    height: 30,
  },
  divisoria: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: '1fr',
    gridColumnGap: '0px',
    gridRowGap: '0px',
  },
};

export default App;