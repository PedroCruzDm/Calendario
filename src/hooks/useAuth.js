// hooks/useAuth.js
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./FireBase/firebaseconfig";

const useAuth = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUsuarioLogado({ uid: user.uid, email: user.email, ...docSnap.data() });
          } else {
            console.warn("Documento do usuário não encontrado no Firestore.");
            setUsuarioLogado(null);
          }
        } catch (err) {
          console.error("Erro ao buscar documento do usuário:", err);
          setUsuarioLogado(null);
        }
      } else {
        setUsuarioLogado(null);
      }

      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  return { usuarioLogado, carregando };
};

export default useAuth;