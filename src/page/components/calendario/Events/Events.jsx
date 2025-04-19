import { getFirestore, collection, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from './../../../../firebaseconfig.js';

export const eventos = [
  {
    id: 1,
    title: 'Primeiro evento',
    start: new Date(2025, 3, 1, 10, 0),
    end: new Date(2025, 3, 1, 24, 0),
    color: '#ae00ff',
    type: 'evento teste',
    important: "teste",
    desc: 'Primeiro calendário teste',
  },
  {
    id: 2,
    title: 'Feira do Empreendedor',
    start: new Date(2025, 4, 10, 10, 0),
    end: new Date(2025, 4, 10, 24, 0),
    color: 'orange',
    type: 'Entrega do Projeto',
    important: "urgente",
    desc: 'Feira do Empreendedor, apresentação do Calendário',
  },
];  //console.log("Eventos do Firestore:", eventos); //log verificar os eventos

export const fetchEventos = async () => { // Função para buscar eventos do Firestore
    const eventoDocRef = doc(db, "eventos", "oPGh2eSrnLpsX7G1ed7H");//documento específico
    const eventoDocSnap = await getDoc(eventoDocRef);
    
    if (eventoDocSnap.exists()) {
      const eventoData = eventoDocSnap.data(); // Obter dados do doc
  
      //converter a string de data para Date
      const convertToDate = (dateString) => {
        const [year, month, day, hours, minutes] = dateString.split(', ').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
      };
  
      // Add dados do Firestore no eventos
      const eventosFirestore = {
        id: eventoDocSnap.id,
        title: eventoData.title,
        start: convertToDate(eventoData.start),
        end: convertToDate(eventoData.end),
        color: eventoData.color,
        type: eventoData.type,
        important: eventoData.important,
        desc: eventoData.desc,
      };
  
      return [...eventos, eventosFirestore];
    } else {
      console.log("Nenhum evento encontrado no Firestore!");
      return eventos;
    }
  };