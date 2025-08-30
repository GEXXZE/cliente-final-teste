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

    const qrCodeScanner = new Html5QrcodeScanner(
      scannerRef.current.id,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    // Função que lida com o sucesso do escaneamento
    const onScanSuccess = (decodedText: string, _: any) => { 
      console.log('Código QR escaneado:', decodedText);
      
      // Limpa o scanner para interromper o escaneamento
      qrCodeScanner.clear().catch(error => console.error(error));

      // Navega para a página de agendamento com o valor do QR Code como parâmetro na URL
      navigate(`/cliente-final/agendar/${decodedText}`);
    };

    // Função que lida com erros de escaneamento
    const onScanError = (errorMessage: string) => {
      console.error('Erro ao escanear:', errorMessage);
    };

    // Inicia o scanner
    qrCodeScanner.render(onScanSuccess, onScanError);

    // Retorna uma função de limpeza que será executada quando o componente for desmontado
    return () => {
      qrCodeScanner.clear().catch(error => console.error(error));
    };
  }, [navigate]);

  const handleGoBack = () => {
    navigate('/');
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