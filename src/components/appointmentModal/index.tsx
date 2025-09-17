import { useState, useEffect } from "react";
import styles from "./style.module.css";

import {
  getProfissionaisByService,
  getAvailableTimeSlots,
} from "@/services/profissionalService";

import ProfissionalSelector from "@/components/profissionalSelector";
import { TimeSlotSelector } from "@/components/timeSlotSelector";
import Loading from "@/components/loading";
import { DatePicker } from "@/components/datePicker";

import { Profissional } from "@/types/profissional";
import { Availability } from "@/types/availability";

interface AppointmentModalProps {
  show: boolean;
  onClose: () => void;
  providerSlug: string;
  isProviderAutonomous: boolean;
  serviceId: number;
}

export default function AppointmentModal({
  show,
  onClose,
  providerSlug,
  isProviderAutonomous,
  serviceId,
}: AppointmentModalProps) {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [selectedProfissional, setSelectedProfissional] = useState<Profissional | null>(null);
  const [timeSlots, setTimeSlots] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const [loadingProfessionals, setLoadingProfissionais] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);

  // Carregar profissionais (se não for autônomo)
  useEffect(() => {
    if (!show) return;

    const fetchProfissionais = async () => {
      setLoadingProfissionais(true);
      try {
        const data = await getProfissionaisByService(providerSlug, serviceId);
        setProfissionais(data);
        setSelectedProfissional(data.length > 0 ? data[0] : null);
      } catch (error) {
        console.error("Erro ao carregar profissionais:", error);
        setProfissionais([]);
        setSelectedProfissional(null);
      } finally {
        setLoadingProfissionais(false);
      }
    };
    fetchProfissionais();
  }, [show, providerSlug, serviceId]);

  // Carregar horários
  useEffect(() => {
    if (!show || !selectedProfissional) {
      setTimeSlots([]);
      return;
    }

    const fetchTimeSlots = async () => {
      if (!selectedProfissional || !selectedDate) return;

      setLoadingTimeSlots(true);
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]; 
        const data = await getAvailableTimeSlots(
          selectedProfissional.id,
          formattedDate,
          serviceId
        );
        setTimeSlots(data);
      } catch (error) {
        console.error("Erro ao carregar horários:", error);
        setTimeSlots([]);
      } finally {
        setLoadingTimeSlots(false);
      }
    };


    fetchTimeSlots();
  }, [show, selectedProfissional, selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleProfissionalSelect = (profissionalId: number) => {
    const prof = profissionais.find(p => p.id === profissionalId);
    if (prof) {
      setSelectedProfissional(prof);
      setSelectedTimeSlot(null);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalScrollableContent}>
          {/* DatePicker */}
          <DatePicker onDateSelect={handleDateSelect} selectedDate={selectedDate} />

          {/* Professional Selector (apenas para empresas) */}
          {!isProviderAutonomous &&
            (loadingProfessionals ? (
              <Loading />
            ) : (
                <ProfissionalSelector
                  profissionais={profissionais}
                  onProfissionalSelect={handleProfissionalSelect}
                  selectedProfissionalId={selectedProfissional?.id || null}
                />
            ))}

          {/* Time Slot Selector */}
          {selectedProfissional &&
            (loadingTimeSlots ? (
              <Loading />
            ) : (
              <TimeSlotSelector
                timeSlots={timeSlots}
                onTimeSlotSelect={setSelectedTimeSlot}
                selectedTimeSlot={selectedTimeSlot}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
