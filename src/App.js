import React from 'react';
import './App.css';
import Calendario from './components/Calendario/calendario.jsx';
import Header from './components/Header/Header.jsx';
import CadastroModal from './components/Modals/CadastroModal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [modalAberto, setModalAberto] = React.useState(false);

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