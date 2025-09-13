import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './style.module.css';

export default function EscanearQr() {
  const navigate = useNavigate();
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    // Use uma função para lidar com o sucesso da leitura
    const onScanSuccess = (decodedText: string, _: any) => { 
      console.log('Código QR escaneado:', decodedText);
      
      // Limpa o scanner
      // qrCodeScanner.clear() é chamado no return, mas podemos chamar aqui também para garantir
      // a interrupção imediata, a menos que a biblioteca já faça isso.
      // O 'clear' dentro de uma promise é uma boa prática
      qrCodeScanner.clear().catch(error => console.error(error));

      // Redireciona o navegador para a URL completa do QR Code
      window.location.href = decodedText;
    };

    // Função que lida com erros de escaneamento
    const onScanError = (errorMessage: any) => {
      console.error('Erro ao escanear:', errorMessage);
    };

    // Inicia o scanner
    const qrCodeScanner = new Html5QrcodeScanner(
      scannerRef.current.id,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    qrCodeScanner.render(onScanSuccess, onScanError);

    // Retorna uma função de limpeza que será executada quando o componente for desmontado
    return () => {
      qrCodeScanner.clear().catch(error => console.error(error));
    };
  }, []); // A dependência 'navigate' foi removida porque não é mais usada para navegação direta

  const handleGoBack = () => {
    navigate(-1); // Usar -1 para voltar à página anterior é uma prática melhor
  };

  return (
    <div className={styles['scanner-page']}>
      <header className={styles['scanner-header']}>
        <button onClick={handleGoBack} className={styles['back-button']}>
          <FaArrowLeft size={24} color="currentColor" />
        </button>
        <h2>Digitalizar código QR</h2>
      </header>

      <div className={styles['scanner-container']}>
        <div id="reader" ref={scannerRef}></div>
      </div>

      <div className={styles['scanner-footer']}>
        <p>O provedor de conta exibirá um código QR</p>
        <button className={styles['manual-input-button']}>
          Inserir o código manualmente
        </button>
      </div>
    </div>
  );
}