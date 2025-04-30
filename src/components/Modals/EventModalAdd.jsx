import React, { useState } from "react";
import style from "./Styles/style.css";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from '../../hooks/FireBase/firebaseconfig.js';

const EventModalAdd = ({ event, onClose, onAddEvento }) => {
    const [title, setTitle] = useState(event.title);
    const [type, setType] = useState(event.type);
    const [desc, setDesc] = useState(event.desc);
    const [start, setStart] = useState(event.start.toISOString().slice(0, 16));
    const [end, setEnd] = useState(event.end.toISOString().slice(0, 16));
    const [important, setImportant] = useState(event.important);
    const [color, setColor] = useState('#00aaff'); // Cor padrão inicial

    const handleSave = async () => {
        if (title.trim() === "") {
            alert("O título do evento não pode estar vazio.");
            return;
        }
        else if (start >= end) {
            alert("A data de início deve ser anterior à data de término.");
            return;
        }
        
        else{
            const newEvent = {
            title,
            type,
            desc,
            start,
            end,
            important,
            color,
            id: Date.now(),
        };
        
        try {
            const docRef = await addDoc(collection(db, "eventos"), newEvent);
            newEvent.id = docRef.id; // substitui o id local pelo id do Firestore
            
            if (onAddEvento) {
                onAddEvento(newEvent);
            }

            onClose();
        } catch (error) {
            console.error("Erro ao adicionar evento:", error);
        }
    };
}

    return (
        <div className="modal_event" onClick={(e) => e.stopPropagation()}>
            <div className="modal_event_container">
                <div className="modal_event_header">
                    <h2>Adicionar novo Evento</h2>
                    <button onClick={onClose} className="modal_event_close">X</button>
                </div>

                <div className="modal_event_body">
                    <p>Nome do Evento:</p>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required/>

                    <p>Tipo de Evento:</p>
                    <select value={type} onChange={e => setType(e.target.value)} required>
                        <option value="Reunião">Reunião</option>
                        <option value="Tarefa">Tarefa</option>
                        <option value="Evento">Evento</option>
                        <option value="Sabado Letivo">Sábado Letivo</option>
                        <option value="Outro">Outro</option>
                    </select>

                    <p>Descrição do Evento:</p>
                    <textarea value={desc} onChange={e => setDesc(e.target.value)} style={{resize: 'vertical', height: '20px', maxHeight: '100px',}} required></textarea>

                    <p>Data de Inícial do evento:</p>
                    <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required/>

                    <p>Data de Final do evento:</p>
                    <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required/>

                    <p>Importância do evento:</p>
                    <select value={important} onChange={e => setImportant(e.target.value)} required>
                        <option value="n/a">N/A</option>
                        <option value="Leve">Leve</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Importante">Importante</option>
                        <option value="Urgente">Urgente</option>
                    </select>

                    <p>Escolha a cor do evento:</p>
                    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <div className="div_grupo_cor">
                            <input type="color" value={color} onChange={e => setColor(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="modal_event_buttons">
                        <button className="modal_event_save" onClick={handleSave}>Salvar</button>
                        <button className="modal_event_cancel" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModalAdd;