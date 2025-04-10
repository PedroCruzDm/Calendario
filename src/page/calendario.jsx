import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDrop = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);




function Calendario() {
  const events = [
    {
      start: new Date(),
      end: new Date(moment().add(1, "days")),
      title: "",
    },

  ];

  return (
    <div>
      <DragAndDrop
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        resizable
        className="calendar"
      />
    </div>
  );
}

export default Calendario;