import style from './style.module.css';

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

const getWeekDays = (): { day: string, date: number, fullDate: Date }[] => {
  const today = new Date();
  const week = [];
  const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    week.push({
      day: days[date.getDay()],
      date: date.getDate(),
      fullDate: date,
    });
  }
  return week;
};

export function DatePicker({ onDateSelect, selectedDate }: DatePickerProps){
  const weekDays = getWeekDays();

  return (
    <div className={style.container}>
      <h3>Agendar Dia</h3>
      <div className="date-picker-list">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`date-item ${day.fullDate.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
            onClick={() => onDateSelect(day.fullDate)}
          >
            <span>{day.day}</span>
            <span>{day.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};