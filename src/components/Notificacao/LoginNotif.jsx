import useToast from '../../hooks/notificacao/useToast';

export const BotaoNotificar = () => {
  const toast = useToast();

  return (
    <button onClick={() => toast.error("Cadastro feito com sucesso!")}>
      Notificar
    </button>
  );
}

export const LoginSuccess = () => {
    const toast = useToast();
        toast.success("Login realizado com sucesso!");
    return null;

}