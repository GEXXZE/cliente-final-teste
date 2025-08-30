import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './style.module.css';

export default function EscanearQr() {
  const navigate = useNavigate();
  const [result, setResult] = useState('');
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

    const onScanSuccess = (decodedText: string, _: any) => { 
      console.log('Código QR escaneado:', decodedText);
      setResult(decodedText);
      qrCodeScanner.clear().catch(error => console.error(error));
    };

    const onScanError = (errorMessage: string) => {
      console.error('Erro ao escanear:', errorMessage);
      navigate("/cliente-final/agendar");
    };

    qrCodeScanner.render(onScanSuccess, onScanError);

    return () => {
      qrCodeScanner.clear().catch(error => console.error(error));
    };
  }, []);

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
        {result && <div className={styles['scan-result']}>Resultado: {result}</div>}
      </div>
    </div>
  );
}
