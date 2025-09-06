import styles from './style.module.css';
import { QrCodeButton }  from '@/components/qrCodeButton';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Home</h1>
            <QrCodeButton />
        </div>
    )
}