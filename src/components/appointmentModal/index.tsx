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
  serviceId: number;
}

export default function AppointmentModal({show, onClose, providerSlug, serviceId }: AppointmentModalProps) {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [selectedProfissional, setSelectedProfissional] = useState<Profissional | null>(null);
  const [timeSlots, setTimeSlots] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const [loadingProfessionals, setLoadingProfissionais] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);

  useEffect(() => {
    if (!show) return;

    const fetchProfissionais = async () => {
      setLoadingProfissionais(true);
      try {
        const data = await getProfissionaisByService(providerSlug, serviceId);

        console.log("Profissionais recebidos:", data);

        setProfissionais(data);
        if (data.length === 1) {
          setSelectedProfissional(data[0]);
        } else {
          setSelectedProfissional(null);
        }
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
  }, [show, selectedProfissional, selectedDate, serviceId]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleProfissionalSelect = (profissionalId: number) => {
    const prof = profissionais.find(p => p.id === profissionalId);
    if (prof) {
      setSelectedProfissional(prof);
      setSelectedTimeSlot(null);
      // Ao selecionar um profissional, re-selecionar a data de hoje para recarregar horários
      setSelectedDate(new Date());
    }
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
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
          {profissionais.length > 1 && (
            <>
              <h2>Selecione o Profissional</h2>
              {loadingProfessionals ? (
                <Loading />
              ) : (
                <ProfissionalSelector
                  profissionais={profissionais}
                  onProfissionalSelect={handleProfissionalSelect}
                  selectedProfissionalId={selectedProfissional?.id || null}
                />
              )}
            </>
          )}

          {/* Seletor de Data e Horário (só aparece depois de um profissional ser selecionado) */}
          {selectedProfissional && (
            <>
              <div className={styles.separator} />
              <h2>Escolha a Data e o Horário</h2>
              <DatePicker onDateSelect={handleDateSelect} selectedDate={selectedDate} />

              {loadingTimeSlots ? (
                <Loading />
              ) : (
                <TimeSlotSelector
                  timeSlots={timeSlots}
                  onTimeSlotSelect={handleTimeSlotSelect}
                  selectedTimeSlot={selectedTimeSlot}
                />
              )}
            </>
          )}

          {/* Botão de Confirmação (pode ser adicionado aqui) */}
          {/* Você pode adicionar um botão de 'Confirmar' que só fica ativo quando selectedTimeSlot não é nulo. */}
          {selectedTimeSlot && (
            <button className={styles.confirmButton}>
              Confirmar Agendamento
            </button>
          )}

        </div>
      </div>
    </div>
  );
}