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
      <div className='App-header'>
        <ToastContainer />
        <Header onAbrirModalCadastro={() => setModalAberto(true)} />
        <CadastroModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      </div>      
        <Calendario />
    </div>
  );
}

export default App;