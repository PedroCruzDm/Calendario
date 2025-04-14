import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'moment/locale/pt-br';

const DragAndDrop = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario(){
  const [events, setEvents] = React.useState([
    {
      id: 1,
      title: 'Primeiro evento',
      start: new Date(2025, 3, 1, 10, 0),
      end: new Date(2025, 3, 1, 24, 0),
      desc: 'Primeiro calendário teste',
    },
  ]);

  const onEventDrop = (data) => {
    const { start, end } = data;
    const updatedEvents = events.map((event) => {
      if (event.id === data.event.id) {
        return { ...event, start, end };
      }
      return event;
    });
    setEvents(updatedEvents);
  }

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
        onEventResize={onEventDrop}
        className="calendar"
      />
    </div>
  );
}

export default Calendario;