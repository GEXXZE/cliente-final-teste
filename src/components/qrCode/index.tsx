import styles from './style.module.css';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';

export default function QrCode() {
    const { theme } = useTheme();
    const { usuario } = useUser();

  if (!usuario) return <p>Carregando...</p>;
    return (
        <div>
            <h3 style={{ color: theme.colors.text }}>Seu QR Code:</h3>
            {usuario.qrCode && (
                <div className={styles.container}>
                    <img
                        src={usuario.qrCode} 
                        alt="QR Code"
                        className={styles.qrCode}
                    />
                </div>
            )}
        </div>
    )
}