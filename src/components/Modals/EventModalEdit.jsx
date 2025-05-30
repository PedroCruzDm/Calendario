import { useState } from "react";
import { auth, db, usuariosRef } from "./../../hooks/FireBase/firebaseconfig.js";
import { doc, updateDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import './Styles/style.css';

const EventModalEdit = ({ event, onClose, onUpdateEvento }) => {
  const [title, setTitle] = useState(event.title);
  const [type, setType] = useState(event.type);
  const [desc, setDesc] = useState(event.desc);
  const [start, setStart] = useState(
    typeof event.start === "string"
      ? event.start
      : new Date(
          event.start?.seconds ? event.start.seconds * 1000 : event.start
        ).toISOString().slice(0, 16)
  );
  const [end, setEnd] = useState(
    typeof event.end === "string"
      ? event.end
      : new Date(
          event.end?.seconds ? event.end.seconds * 1000 : event.end
        ).toISOString().slice(0, 16)
  );
  const [important, setImportant] = useState(event.important);
  const [color, setColor] = useState(event.color || "#00aaff");

  const handleUpdate = async () => {
    if (title.trim() === "") {
      toast.error("O título do evento não pode ficar vazio.");
      return;
    }
    if (new Date(start) >= new Date(end)) {
      toast.error("A data de início deve ser anterior à data de término.");
      return;
    }

    try {
      const user = auth.currentUser;
      let docRef;

      if (user && user.uid) {
        docRef = doc(db, usuariosRef, user.uid, "eventos", event.id);
        console.log("Usuário logado:", user.uid);
        console.log("Atualizando evento na subcoleção do usuário:", `usuarios/${user.uid}/eventos/${event.id}`);
      } else {
        // Usuário não logado: caminho para a coleção global de eventos
        docRef = doc(db, "eventos", event.id);
        console.log("Atualizando evento na coleção global:", `eventos/${event.id}`);
      }

      const updatedEventData = {
        title,
        type,
        desc,
        start: new Date(start),
        end: new Date(end),
        important,
        color,
      };

      await updateDoc(docRef, updatedEventData);

      onUpdateEvento?.({
        ...event,
        ...updatedEventData
      });

      toast.success("Evento atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      toast.error("Erro ao atualizar evento. Verifique suas permissões ou tente novamente.");
    }
  };

  return (
    <div className="modal_event">
      <div className="modal_event_container">
        <div className="modal_event_header">
          <h2>Editar Evento</h2>
          <button onClick={onClose} className="modal_event_close">X</button>
        </div>

        <div className="modal_event_body">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do Evento" // Adicionado placeholder
            required
          />

          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="Reunião">Reunião</option>
            <option value="Tarefa">Tarefa</option>
            <option value="Evento">Evento</option>
            <option value="Sabado Letivo">Sábado Letivo</option>
            <option value="Outro">Outro</option>
          </select>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Descrição do evento" // Adicionado placeholder
            required
          ></textarea>

          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />

          <select
            value={important}
            onChange={(e) => setImportant(e.target.value)}
            required
          >
            <option value="n/a">N/A</option>
            <option value="Leve">Leve</option>
            <option value="Moderado">Moderado</option>
            <option value="Importante">Importante</option>
            <option value="Urgente">Urgente</option>
          </select>

          <p>Escolha a cor do evento:</p>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />

          <div className="modal_event_buttons">
            <button className="modal_event_save" onClick={handleUpdate}>
              Atualizar
            </button>
            <button className="modal_event_cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModalEdit;