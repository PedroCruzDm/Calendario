// Exemplo: components/BotaoNotificar.jsx
// Update the import path below to the correct location of useToast, for example:
import useToast from '../../hooks/notificacao/useToast';
// Or create the hook at ../hooks/useToast.js if it doesn't exist

export const BotaoNotificar = () => {
  const toast = useToast();

  return (
    <button onClick={() => toast.error("Cadastro feito com sucesso!")}>
      Notificar
    </button>
  );
}