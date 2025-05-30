import { doc, updateDoc } from "firebase/firestore";
import { db, usuariosRef, eventosRef } from "../FireBase/firebaseconfig";
import useAuth from "../useAuth";

export const updateEvento = async (evento) => {
  const { usuarioLogado: user } = useAuth();

  if (!evento.id) throw new Error("Evento sem ID");

  let docRef;

  if (user && user.uid) {
    // Usuário logado: usa subcoleção do usuário
    docRef = doc(db, usuariosRef, user.uid, "eventos", evento.id);
    console.swan("Atualizando evento na subcoleção do usuário:", docRef.path);
  } else {
    // Caso não esteja logado: evento global
    docRef = doc(db, eventosRef, evento.id);
  }

  await updateDoc(docRef, {
    title: evento.title,
    type: evento.type,
    desc: evento.desc,
    start: new Date(evento.start),
    end: new Date(evento.end),
    important: evento.important,
    color: evento.color,
  });
};