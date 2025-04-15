import React from "react";
import style from "./style.css";

const EventModal = ({ event, onClose }) => {
    return(
        <div className="modal_event">
            <div className="modal_event_container">
                <div className="modal_event_header">
                    <h2>{event.title}</h2>
                    <button onClick={onClose} className="modal_event_close">X</button>
                </div>

                <div className="modal_event_body">
                    <h2>{event.title}</h2>
                    <p>{event.desc}</p>
                    <p>Início: {event.start.toString()}</p>
                    <p>Fim: {event.end.toString()}</p>
                </div>
        
            </div>
        </div>
    );
}

export default EventModal;