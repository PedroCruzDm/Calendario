import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer,} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'; 
import 'moment/locale/pt-br';
import EventModal from '../Modals/EventModal.jsx';
import EventModalAdd from '../Modals/EventModalAdd.jsx';
import { eventos, fetchEventos } from './../../hooks/Calendario/Eventos.js';
import './Style/calendario.css';

const DragAndDrop = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {
  const [events, setEvents] = useState(eventos); //Iniciando com os eventos
  const [eventsSelected, setEventsSelected] = useState(null);

  React.useEffect(() => {
    const carregarEventos = async () => {
      const dados = await fetchEventos();
      console.log(dados);
      setEvents(dados);
    };
    carregarEventos();
  }, []);
  
  const onEventDrop = (data) => {
    const { start, end } = data;
    const updatedEvents = events.map((event) => {
      if (event.id === data.event.id) {
        return { ...event, start, end };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const onEventResize = (data) => {
    const { start, end } = data;
    const updatedEvents = events.map((event) => {
      if (event.id === data.event.id) {
        return { ...event, start, end };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleEventSelect = (event) => {
    setEventsSelected(event);
  };

  const handleEventClose = () => {
    setEventsSelected(null);
  };

  const AdicionarEvent = (slotInfo) => {
    const newEvent = {
      id: events.length + 1,
      title: '',
      start: slotInfo.start,
      end: slotInfo.end,
      color: '',
      type: 'novo evento',
      important: "n/a",
      desc: 'Evento criado ao selecionar um intervalo',
    };
    setEvents([...events, newEvent]);
    setEventsSelected(newEvent);
  };

  return (
    <div>
      <DragAndDrop
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView="month"
        views={['month', 'week', 'day',]}
        
        events={events}
        resizable
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        eventPropGetter={EventStyle}
        onDoubleClickEvent={handleEventSelect}
        onUpdateEvent={handleEventSelect}
        selectable
        onSelectSlot={AdicionarEvent}
        className="calendario"
        popup={true}
      />

      {eventsSelected && (
        <EventModal event={eventsSelected} onClose={handleEventClose} className="modal_event"/>
      )}
      
      {eventsSelected && eventsSelected.title === '' && (
        <EventModalAdd event={eventsSelected} onClose={handleEventClose} className="modal_event"/>
      )}

    </div>
  );
}

const EventStyle = (event) => {
  return {
    style: {
      backgroundColor: event.color,
      fontWeight: 'bold',
      fontSize: 20,
    },
  };
};

export default Calendario;