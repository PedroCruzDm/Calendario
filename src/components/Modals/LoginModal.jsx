import { useState } from "react";
import "./Styles/style.css";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from '../../hooks/FireBase/firebaseconfig.js';
import { fetchEventos } from "../../hooks/Calendario/Eventos.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import useToast from '../../hooks/notificacao/useToast.js'; //notificação
import { toast } from "react-toastify";

const LoginCheck = ({ isOpen, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const toast = useToast();

    const auth = getAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const usuariosRef = collection(db, "usuarios");
            const q = query(usuariosRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                
                const userCredential = await signInWithEmailAndPassword(auth, email, senha);
                const user = userCredential.user;

                if (onLoginSuccess) onLoginSuccess(userData);
                await fetchEventos();
                toast.success(`Bem-vindo(a), ${userData.nome}!`);

                if (onClose) onClose();
            } else {
                console.error("Usuário não encontrado na coleção 'usuarios'.");
                toast.error("Usuário não encontrado na coleção 'usuarios'.");

            }
        } catch (err) {
            setError("Erro ao tentar logar: " + err.message);
        }
    };

    // 🛑 Exibe apenas se o modal estiver aberto
    if (!isOpen) return null;
    
    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <form onSubmit={handleLogin} style={styles.form}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={styles.input}
                        />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                        style={styles.input}
                        />
                    <button type="submit" style={styles.button}>Entrar</button>
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="button" style={styles.closeButton} onClick={onClose}>
                        Fechar
                    </button>
                </form>
            </div>
        </div>
    );
};


// Estilos inline do modal
const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    form: {
        display: 'flex', flexDirection: 'column', gap: 12,
    },
    input: {
        padding: 8, borderRadius: 4, border: '1px solid #ccc',
    },
    button: {
        padding: 10, borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer',
    },
    closeButton: {
        padding: 8, borderRadius: 4, border: 'none', background: '#ccc', color: '#333', cursor: 'pointer', marginTop: 8,
    },
    error: {
        color: 'red', fontSize: 14,
    },
};
export default LoginCheck;