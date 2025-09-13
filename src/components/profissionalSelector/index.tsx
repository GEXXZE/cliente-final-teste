import { Profissional } from '@/types/profissional';
import styles from './style.module.css';

interface ProfissionalSelectorProps {
  profissionais: Profissional[];
  onProfissionalSelect: (profissionalId: number) => void;
  selectedProfissionalId: number | null;
}

export default function ProfissionalSelector({profissionais, onProfissionalSelect, selectedProfissionalId }: ProfissionalSelectorProps) {
  if (profissionais.length === 0) {
    return null; 
  }

  return (
    <div className={styles.container}>
      <h3>Selecionar Profissional</h3>
      <div className="professional-list">
        {profissionais.map((profissional) => (
          <div
            key={profissional.id}
            className={`professional-item ${profissional.id === selectedProfissionalId ? 'selected' : ''}`}
            onClick={() => onProfissionalSelect(profissional.id)}
          >
            <img src={profissional.urlFoto} alt={profissional.nome} className={styles.professionalImage} />
            <span>{profissional.nome.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};