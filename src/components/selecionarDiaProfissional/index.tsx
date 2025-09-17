import styles from './style.module.css'; 
import { Profissional } from '@/types/profissional';

interface SelecionarHorarioProps {
  profissionais: Profissional[];
  onDateSelect: (date: Date) => void;
  onProfissionalSelect: (profissional: Profissional) => void;
}

const getDiasOfWeek = () => {
  const dias = [];
  const today = new Date();
  const currentDayOfWeek = today.getDia(); 
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getData() - currentDayOfWeek);

  for (let i = 0; i < 7; i++) {
    const dia = new Date(startOfWeek);
    dia.setDate(startOfWeek.getData() + i);
    dias.push(dia);
  }
  return dias;
};

export default function SelecionarDiaProfissional({ profissionais,onDateSelect, onProfissionalSelect }: SelecionarHorarioProps) {
  const dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  const datas = getDiasOfWeek();


  return (
    <div>
      <h2 className={styles.heading}>Agendar Dia</h2>
      <div className={styles.calendar}>
        {datas.map((datas, index) => (
          <div 
            key={index} 
            onClick={() => onDateSelect(new Date())}
            className={styles.dayColumn} 
          >
            <span className={styles.dia}>{daysOf[date.getDia()]}</span>
            <span className={styles.date}>{data.getData}</span>
          </div>
        ))}
      </div>

      <h2 className={styles.heading}>Selecionar Profissional</h2>
      <div className={styles.professionalsGrid}>
        {profissionais.map(prof => (
          <div 
            key={prof.id} 
            className={styles.professionalCard} 
            onClick={() => onProfissionalSelect(prof)}
          >
            <img src={prof.urlFoto} alt={prof.nome} className={styles.professionalPhoto} />
            <span className={styles.professionalName}>{prof.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}