import { useEffect, useState } from "react";
import "./css/header.css";
import CadastroModal from "../Modals/CadastroModal";
import LoginModal from "../Modals/LoginModal";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { auth, db } from "../../hooks/FireBase/firebaseconfig";
import { toast } from "react-toastify";

function Header() {
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
      //console.log("UID do usuário autenticado:", user.uid);

        try {
          // Busca todos os documentos da coleção "usuarios"
          const usuariosCollection = collection(db, "usuarios");
          const usuariosSnapshot = await getDocs(usuariosCollection);
          let userData = null;
          usuariosSnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.uid === user.uid) {
            //console.log("Dados do usuário encontrado:", data);
              userData = data;
            }
          });

          if (userData) {
            setUsuarioLogado({
              uid: user.uid,
              nome: userData.nome || user.displayName || user.email,
              foto: userData.foto || user.photoURL || "https://via.placeholder.com/30",
              email: user.email,
              tipoConta: userData.tipoConta || "normal",
            });
          } else {
            console.log("Documento do usuário não encontrado no Firestore para UID:", user.uid);
            setUsuarioLogado({
              uid: user.uid,
              nome: user.displayName || user.email,
              foto: user.photoURL || "https://via.placeholder.com/30",
              email: user.email,
            });
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          setUsuarioLogado({
            uid: user.uid,
            nome: user.displayName || user.email,
            foto: user.photoURL || "https://via.placeholder.com/30",
            email: user.email,
          });
        }
      } else {
        setUsuarioLogado(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const abrirModalCadastro = () => setModalCadastroAberto(true);
  const fecharModalCadastro = () => setModalCadastroAberto(false);
  const abrirModalLogin = () => setModalLoginAberto(true);
  const fecharModalLogin = () => setModalLoginAberto(false);

  const handleLogout = async () => {
    await signOut(auth);
    setUsuarioLogado(null);
    toast.info("Logout realizado com sucesso!");
  };

  const handleLoginSuccess = (usuario) => {
    setUsuarioLogado(usuario);
    fecharModalLogin();
  };

  return (
    <>
      <header className="header">
        <div className="header-guest">
          <span className="project-name">Agenda Pessoal</span>

          {usuarioLogado ? (
            <div className="user-info">
              <img
                src={usuarioLogado.foto}
                alt="profile-img"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  marginRight: 10,
                  objectFit: "cover",
                }}
              />
              <span>{usuarioLogado.nome || usuarioLogado.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Sair
              </button>
            </div>
          ) : (
            <>
              <button className="signup-btn" onClick={abrirModalCadastro}>
                Criar Conta
              </button>
              <button className="login-btn" onClick={abrirModalLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </header>

      <CadastroModal
        isOpen={modalCadastroAberto}
        onClose={fecharModalCadastro}
      />

      <LoginModal
        isOpen={modalLoginAberto}
        onClose={fecharModalLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Header;
