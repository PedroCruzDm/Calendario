import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FireBase/firebaseconfig";

export const updateEventoFirestore = async (evento) => {
  try {
    const docRef = doc(db, "eventos", evento.id);
    await updateDoc(docRef, {
      ...evento,
      start: evento.start instanceof Date ? evento.start.toISOString() : evento.start,
      end: evento.end instanceof Date ? evento.end.toISOString() : evento.end,
    });
  } catch (error) {
    console.error("Erro ao atualizar evento no Firestore:", error);
  }
};
