import { useState } from "react";
import "./Styles/style.css";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from '../../hooks/FireBase/firebaseconfig.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import useToast from '../../hooks/notificacao/useToast.js';

const auth = getAuth();

const CadastroModal = ({ isOpen, onClose, onAddUsuario }) => {
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [email, setEmail] = useState("");
    const [tipoConta, setTipoConta] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();


    if (!isOpen) return null;

    const handleSave = async () => {
        setError("");
        if (senha !== confirmarSenha) {
            setError("As senhas não coincidem.");
            return;
        }
        if (!nome || !email || !tipoConta || !senha) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }
        setLoading(true);

        try {
            // 1) Criar usuário no Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            // 2) Criar documento no Firestore, incluindo o uid do auth
            const newUser = {
            uid: user.uid,  // id do usuário do auth
            nome,
            foto,
            email,
            tipoConta,
            criadoEm: Timestamp.now(),
            };

            const docRef = await addDoc(collection(db, "usuarios"), newUser);
            newUser.id = docRef.id;

            // 3) Criar subcoleção "eventos" com o primeiro evento chamado "tuturial"
            await addDoc(collection(docRef, "eventos"), {
            nome: "tuturial",
            criadoEm: Timestamp.now(),
            });

            if (onAddUsuario) onAddUsuario(newUser);
            toast.success("Usuário cadastrado com sucesso!");
            onClose();
        } catch (err) {
            setError("Erro ao cadastrar usuário: " + err.message);
            toast.error("Erro ao cadastrar usuário:" + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="modal_event" onClick={e => e.stopPropagation()}>
            <div className="modal_event_container">
                <div className="modal_event_header">
                    <h2>Cadastro de Usuário</h2>
                    <button onClick={onClose} className="modal_event_close">X</button>
                </div>
                <div className="modal_event_body">
                    <p>Nome:</p>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />

                    <p>URL da Foto de Perfil:</p>
                    <input type="text" value={foto} onChange={e => setFoto(e.target.value)} />

                    <p>Email:</p>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

                    <p>Tipo de Conta:</p>
                    <select value={tipoConta} onChange={e => setTipoConta(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="usuario">Usuário</option>
                        <option value="admin">Administrador</option>
                    </select>

                    <p>Senha:</p>
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />

                    <p>Confirmar Senha:</p>
                    <input type="password" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />

                    {error && <div style={{ color: "red", fontSize: 14 }}>{error}</div>}

                    <div className="modal_event_buttons">
                        <button className="modal_event_save" onClick={handleSave} disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                        <button className="modal_event_cancel" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroModal;