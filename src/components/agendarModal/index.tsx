import { useState } from 'react';
import styles from './style.module.css'
import SelecionarDiaProfissional from '@/components/selecionarDiaProfissional';
import SelecionarHorario from '@/components/selecionarDiaProfissional';

interface AgendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgendarModal({ isOpen, onClose }: AgendarModalProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleDayAndProfessionalSelection = (day: string, professional: string) => {
    setSelectedDay(day);
    setSelectedProfessional(professional);
  };

  const handleBack = () => {
    setSelectedDay(null);
    setSelectedProfessional(null);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {selectedDay && selectedProfessional ? (
          <SelecionarHorario 
            dia={selectedDay} 
            profissional={selectedProfessional} 
            onBack={handleBack} 
            onClose={onClose} 
          />
        ) : (
          <SelecionarDiaProfissional 
            dia={selectedDay}
            profissional={selectedProfessional}
            onBack={handleBack}
            onClose={onClose}
            onSelection={handleDayAndProfessionalSelection}
          />
        )}
      </div>
    </div>
  );
}