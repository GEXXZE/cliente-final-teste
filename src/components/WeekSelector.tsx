// WeekSelector.tsx
import React, { useState } from 'react';
import { useWeekDays } from './useWeekDays';

interface WeekSelectorProps {
  onDateSelect: (selectedDate: string) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({ onDateSelect }) => {
  // Passamos a data atual para o hook
  const weekDays = useWeekDays(new Date('2025-09-30')); // Usando 30/09/2025 para simular o cenário
  
  // Estado para rastrear o dia selecionado (opcional, mas bom para UX)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayClick = (dayData: { fullDate: string, isToday: boolean }) => {
    setSelectedDate(dayData.fullDate);
    // Chama a função passada pelo componente pai (onde você fará a chamada ao backend)
    onDateSelect(dayData.fullDate); 
    
    // Para fins de demonstração:
    console.log(`Data COMPLETA enviada ao backend: ${dayData.fullDate}`);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
      {weekDays.map((day, index) => (
        <div
          key={index}
          onClick={() => handleDayClick(day)}
          style={{
            textAlign: 'center',
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: day.isToday ? '#FFD700' : (selectedDate === day.fullDate ? '#007BFF' : '#f0f0f0'),
            color: selectedDate === day.fullDate ? 'white' : 'black',
            borderRadius: '4px',
            fontWeight: day.isToday ? 'bold' : 'normal',
            border: day.isToday ? '2px solid orange' : 'none',
          }}
        >
          <div style={{ fontSize: '12px' }}>{day.dayName}</div>
          <div style={{ fontSize: '18px' }}>{day.dayOfMonth}</div>
          {day.isToday && <div style={{ fontSize: '8px' }}>Hoje</div>}
        </div>
      ))}
    </div>
  );
};
