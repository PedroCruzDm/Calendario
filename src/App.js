import './App.css';
import React from 'react';
import Calendario from './page/calendario';

function App() {
  return (
    <div className='App_Calendario'>
      <div className='App_Calendario_Header' style={style.App_Calendario_Header}></div>
      <Calendario />
    </div>
  );
}

const style = {
  App_Calendario: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
  },
  App_Calendario_Header: {
    backgroundColor: 'red',
    width: '100%',
    height: 30,
  },
};

export default App;