import React from "react";
import style from "./style.css";
import { useState } from "react";

const AdicionarModal = ({ onClose, onAddEvent }) => {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [type, setType] = useState("");
    const [desc, setDesc] = useState("");
    const [important, setImportant] = useState(0);
    const [color, setColor] = useState("#000000");

    const handleAddEvent = () => {
        const newEvent = {
            id: Math.random(),
            title,
            start: new Date(start),
            end: new Date(end),
            type,
            desc,
            important,
            color,
        };
        onAddEvent(newEvent);
        onClose();
    };
    return (
        <div className="modal_adicionar">
            <div className="modal_adicionar_container">
                <div className="modal_adicionar_header">
                    <h2>Adicionar Evento</h2>
                    <button onClick={onClose} className="modal_adicionar_close">X</button>
                </div>

                <div className="modal_adicionar_body">
                    <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="datetime-local" placeholder="Início" value={start} onChange={(e) => setStart(e.target.value)} />
                    <input type="datetime-local" placeholder="Fim" value={end} onChange={(e) => setEnd(e.target.value)} />
                    <input type="text" placeholder="Tipo" value={type} onChange={(e) => setType(e.target.value)} />
                    <input type="text" placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <input type="number" placeholder="Importante (1 ou 0)" value={important} onChange={(e) => setImportant(e.target.value)} />
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>

                <button onClick={handleAddEvent} className="modal_adicionar_save">Salvar</button>
            </div>
        </div>
    );
}

export default AdicionarModal;