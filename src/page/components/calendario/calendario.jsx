import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'; 
import 'moment/locale/pt-br';
import EventModal from './EventModal/EventModal.jsx';
import EventModalAdd from './EventModal/EventModalAdd.jsx';
import { eventos, fetchEventos } from './Events/Events.jsx';

const DragAndDrop = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {
  const [events, setEvents] = useState(eventos); //Iniciando com os eventos
  const [eventsSelected, setEventsSelected] = useState(null);

  React.useEffect(() => {
    const carregarEventos = async () => {
      const dados = await fetchEventos();
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
      title: 'Novo evento',
      start: slotInfo.start,
      end: slotInfo.end,
      color: '#00aaff',
      type: 'novo evento',
      important: "n/a",
      desc: 'Evento criado ao selecionar um intervalo',
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <DragAndDrop
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView="month"
        style={{ height: 900, fontWeight: 'bold', fontSize: 20 }}
        events={events}
        resizable
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        eventPropGetter={EventStyle}
        onDoubleClickEvent={handleEventSelect}
        selectable
        onSelectSlot={AdicionarEvent}
        className="calendario"
      />

      {eventsSelected && (
        <EventModal event={eventsSelected} onClose={handleEventClose} className="modal_event"/>
      )}

      {eventsSelected && (eventsSelected.title === 'Novo evento') && (
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