import './App.css';
import React from 'react';
import Calendario from './page/calendario';
import {Header} from './page/components/Header/index.jsx';

function App() {
  return (
    <Calendario />
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
    backgroundColor: 'blue',
    width: '100%',
    height: 30,
  },
};

export default App;