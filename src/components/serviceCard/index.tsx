import { Servico } from '@/types/servico';
import styles from './style.module.css';

interface ServiceCardProps {
  service: Servico;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className={styles.card}>
            <h3>{service.nome}</h3>
            <p><strong>Descrição:</strong> {service.descricao}</p>
            <p><strong>Duração:</strong> {service.duracao}</p>
            <p><strong>Valor:</strong> {service.valor}</p>
        </div>
    )
}