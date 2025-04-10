import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDrop = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario(){
  const [events, setEvents] = React.useState([
    {
      id: 1,
      title: 'Primeiro evento',
      start: new Date(2025, 3, 1, 10, 0),
      end: new Date(2025, 3, 1, 12, 0),
      desc: 'Primeiro calendário',
      color: 'red',
    },
  ]);

  return (
    <div>
      <DragAndDrop
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView="week"
        events={events}
        resizable
        className="calendar"
      />
    </div>
  );
}

export default Calendario;