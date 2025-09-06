import { Servico } from '@/types/servico';
import styles from './style.module.css';

interface ServiceCardProps {
  service: Servico;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className={styles.card}>
            <h3>{service.Nome}</h3>
            <p><strong>Descrição:</strong> {service.Descricao}</p>
            <p><strong>Duração:</strong> {service.Duracao}</p>
            <p><strong>Valor:</strong> {service.Valor}</p>
        </div>
    )
}