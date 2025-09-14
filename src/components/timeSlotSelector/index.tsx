import { Availability } from '@/types/availability';
import styles from './style.module.css';

interface TimeSlotSelectorProps {
  timeSlots: Availability[];
  onTimeSlotSelect: (time: string) => void;
  selectedTimeSlot: string | null;
}

export function TimeSlotSelector({timeSlots,onTimeSlotSelect, selectedTimeSlot}: TimeSlotSelectorProps) {
  return (
    <div className={styles.timeSlotContainer}>
      <h3>Selecionar Horário</h3>
      <div className="time-slot-grid">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            className={`time-slot-button ${slot.isAvailable ? 'available' : 'unavailable'} ${slot.time === selectedTimeSlot ? 'selected' : ''}`}
            onClick={() => slot.isAvailable && onTimeSlotSelect(slot.time)}
            disabled={!slot.isAvailable}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};