import { Servico } from '@/types/servico';
import styles from './style.module.css';

interface ServiceCardProps {
  service: Servico;
  onClick?: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
    return (
        <div onClick={onClick} className={styles.card}>
            <h3>{service.Nome}</h3>
            <p><strong>Descrição:</strong> {service.Descricao}</p>
            <p><strong>Duração:</strong> {service.DuracaoMinutos}</p>
            <p><strong>Valor:</strong> {service.Valor}</p>
        </div>
    )
}