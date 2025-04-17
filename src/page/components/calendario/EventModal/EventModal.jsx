import React from "react";
import style from "./../Styles/style.css";

const EventModal = ({ event, onClose}) => {
    return(
        <div className="modal_event">
            <div className="modal_event_container">
                <div className="modal_event_header">
                    <h2>{event.title}</h2>
                    <button onClick={onClose} className="modal_event_close">X</button>
                </div>

                <div className="modal_event_body">
                    <h2>{event.title}</h2>
                    <p>Tipo: {event.type}</p>
                    <p>Descrição: {event.desc}</p>
                    <p>Início: {event.start.toString()}</p>
                    <p>Fim: {event.end.toString()}</p>
                    <p>Nível de importancia: {event.important}</p>
                </div>

                <div className="modal_event_buttons">
                    <button className="modal_event_edit">Editar</button>
                    <button className="modal_event_delete">Excluir</button>
                </div>
        
            </div>
        </div>
    );
}

export default EventModal;