import { Link } from 'react-router-dom';
import { FaQrcode } from 'react-icons/fa';
import styles from './style.module.css';

export function QrCodeButton() {
  return (
    <div className={styles['fab-container']}>
      <Link to="/cliente-final/escanear" className={styles.fab}>
        <FaQrcode size={24} color="white" />
      </Link>
    </div>
  );
}
