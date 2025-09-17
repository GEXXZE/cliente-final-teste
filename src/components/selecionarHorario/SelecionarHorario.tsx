import { useState, useEffect } from 'react';
import styles from './style.module.css'; 

export default function SelecionarHorario({ day, professional, onBack, onClose }) {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    // Simulação de chamada de API para buscar horários
    // Substitua isso pela sua lógica real
    const fetchTimes = async () => {
      // Ex: const response = await fetch(`/api/times?day=${day}&professionalId=${professional.id}`);
      // const times = await response.json();
      const times = ['08:00', '08:30', '09:00'];
      setAvailableTimes(times);
    };

    fetchTimes();
  }, [day, professional]);

  const handleBook = () => {
    if (selectedTime) {
      // Lógica para agendar o serviço
      console.log(`Agendando para ${professional.name} em ${day} às ${selectedTime}`);
      onClose();
    }
  };

  return (
    <div>
      <h2 className={styles.heading}>Selecionar Horário</h2>
      <div className={styles.timesGrid}>
        {availableTimes.map(time => (
          <button 
            key={time} 
            className={`${styles.timeButton} ${selectedTime === time ? styles.selected : ''}`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
      <button 
        className={styles.bookButton} 
        onClick={handleBook}
        disabled={!selectedTime}
      >
        Agendar
      </button>
    </div>
  );
}