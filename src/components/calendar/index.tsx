import { useState } from "react";
import styles from "./style.module.css";

interface CalendarProps {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

const meses = [
  "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
  "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];

const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export function Calendar({ selectedDay, setSelectedDay }: CalendarProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const generateDays = () => {
  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyDay} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      d === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    const isSelected = d === selectedDay; // <- sem checar mês/ano

    days.push(
      <div
        key={d}
        className={`${styles.day} ${isSelected ? styles.selected : isToday ? styles.today : ""}`}
        onClick={() => setSelectedDay(d)}
      >
        {d}
      </div>
    );
  }
  return days;
  };

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <div className={styles.monthYear}>
          <div className={styles.month}>{meses[currentMonth]}</div>
          <div className={styles.year}>{currentYear}</div>
        </div>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>

      {/* Dias da semana */}
      <div className={styles.weekdays}>
        {diasSemana.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dias */}
      <div className={styles.days}>{generateDays()}</div>
    </div>
  );
}