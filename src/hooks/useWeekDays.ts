// useWeekDays.ts

/**
 * Interface para os dados de cada dia da semana.
 */
interface DayData {
  dayName: string; // Ex: 'DOMINGO'
  dayOfMonth: number; // Ex: 28
  fullDate: string; // Ex: '2025-09-28' (formato ideal para enviar ao backend)
  isToday: boolean;
}

// Mapeamento para nomes de dias em português
const dayNameMap: string[] = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

/**
 * Hook para calcular os 7 dias da semana, começando no domingo anterior.
 * @param dateToStart A data a ser usada como ponto de referência (normalmente a data atual).
 * @returns Array de 7 objetos DayData.
 */
export const useWeekDays = (dateToStart: Date = new Date()): DayData[] => {
  const days: DayData[] = [];
  
  // 1. Encontrar o domingo da semana atual ou anterior
  // 0 = Domingo, 1 = Segunda, etc.
  const today = new Date(dateToStart.getFullYear(), dateToStart.getMonth(), dateToStart.getDate());
  const dayOfWeek = today.getDay(); // Ex: 2 (Terça-feira)
  
  // Calcula a diferença para chegar no domingo (se hoje é Terça (2), subtrair 2)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  // 2. Iterar pelos próximos 7 dias a partir do domingo
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(sunday);
    currentDate.setDate(sunday.getDate() + i);

    // Formatação da data (AAAA-MM-DD) para enviar ao backend
    const fullDate = currentDate.toISOString().split('T')[0];

    days.push({
      dayName: dayNameMap[currentDate.getDay()],
      dayOfMonth: currentDate.getDate(),
      fullDate: fullDate,
      isToday: currentDate.toDateString() === today.toDateString(),
    });
  }

  return days;
};
