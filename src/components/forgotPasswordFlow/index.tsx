import { useState } from "react";
import Step1SolicitarEmail from '@/pages/prestador/forgotPassword/SolicitaEmail'; 
import Step2Codigo from '@/pages/prestador/forgotPassword/ValidaCodigo';
import StepAlterarSenha from '@/pages/prestador/forgotPassword/AlteraSenha'; 
import styles from "./step.module.css";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [tokenTemporario, setTokenTemporario] = useState('');

  const handleEmailSubmitted = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep(2);
  };

  const handleCodigoValidated = (token: string) => {
    setTokenTemporario(token);
    setStep(3);
  };

  const handlePasswordChanged = () => {
    alert('Senha alterada com sucesso! Você pode fazer login agora.');
    setStep(1); // Reinicia o fluxo
  };

  // 1. Crie a função que lida com a falha na alteração da senha
  const handlePasswordChangeFailed = () => {
      alert('Não foi possível alterar a senha. Por favor, tente novamente.');
      setStep(1); // Opcional: retorna o usuário para a tela inicial
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1SolicitarEmail onSuccess={handleEmailSubmitted} />;
      case 2:
        return <Step2Codigo email={email} onSuccess={handleCodigoValidated} />;
      case 3:
        return (
          <StepAlterarSenha
            tokenTemporario={tokenTemporario}
            onSuccess={handlePasswordChanged}
            onFailure={handlePasswordChangeFailed} // 2. Passe a função para o componente filho
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.title}>Redefinir Senha</h2>
      {renderStep()}
    </div>
  );
}