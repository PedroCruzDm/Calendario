import React from "react";
import style from "./../Styles/style.css";
import Calendario from "./../calendario.jsx";

const EventModalAdd = ({ event, onClose}) => {
    return(
        <div className="modal_event">
            <div className="modal_event_container">
                <div className="modal_event_header">
                    <h2>Adicionar novo Evento</h2>
                    <button onClick={onClose} className="modal_event_close">X</button>
                </div>

                <div className="modal_event_body">
                    
                    <h2>{event.title}</h2>
                    <input type="text" placeholder={event.title} required/>

                    <p>Tipo: {event.type}</p>
                    <select required>
                        <option value="Reunião">Reunião</option>
                        <option value="Tarefa">Tarefa</option>
                        <option value="Evento">Evento</option>
                        <option value="Sabado Letivo">Sabado Letivo</option>
                        <option value="Outro">Outro</option>
                    </select>

                    <p>Descrição: {event.desc}</p>
                    <textarea placeholder={event.desc} required></textarea>

                    <p>Início: {event.start.toString()}</p>
                    <input type="datetime-local" value={event.start.toString()} required/>

                    <p>Fim: {event.end.toString()}</p>
                    <input type="datetime-local" value={event.end.toString()} required/>

                    <p id="importante">Nível de importancia: {event.important}</p>
                    <select required>
                        <option value="n/a">N/A</option>
                        <option value="Leve">Leve</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Importante">Importante</option>
                        <option value="Urgente">Urgente</option>
                    </select>

                    <div className="modal_event_buttons">
                        <button className="modal_event_save">Salvar</button>
                        <button className="modal_event_cancel" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
        
            </div>
        </div>
    );
}

export default EventModalAdd;