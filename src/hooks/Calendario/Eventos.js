import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "../FireBase/firebaseconfig.js";
import { toast } from "react-toastify";

export const fetchEventos = async () => {
  const auth = getAuth();
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      let eventosFormatados = [];
      try {
        if (!user) {
          console.log("Usuário não autenticado, buscando eventos globais.");
          const eventosRef = collection(db, "eventos");
          const snapshot = await getDocs(eventosRef);
          eventosFormatados = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title,
              start: formatDate(data.start),
              end: formatDate(data.end),
              color: data.color,
              type: data.type,
              important: data.important,
              desc: data.desc,
            };
          });
          return resolve(eventosFormatados);
        }
        
        const eventosRef = collection(db, "usuarios", user.uid, "eventos");
        const snapshot = await getDocs(eventosRef);
        eventosFormatados = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title,
            start: formatDate(data.start),
            end: formatDate(data.end),
            color: data.color,
            type: data.type,
            important: data.important,
            desc: data.desc,
          };
        });
        resolve(eventosFormatados);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        resolve([]);
      }
    });
  });
};

export const addEvento = async (evento) => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      try {
        let eventosRef;
        if (user) {
          eventosRef = collection(db, "usuarios", user.uid, "eventos");
        } else {
          eventosRef = collection(db, "eventos");
        }
        const docRef = await addDoc(eventosRef, evento);
        resolve({ id: docRef.id, ...evento });
        toast.success("Evento adicionado com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar evento:", error);
        toast.error("Ocorreu um erro ao adicionar o evento.");
        reject(error);
      }
    });
  });
};

export const eventos = [];