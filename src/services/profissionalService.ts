import API_BASE_URL from "./api";
import { Profissional } from "@/types/profissional";
import { ApiTimeSlot } from "@/types/apiTimeSlot";
import { Availability } from "@/types/availability";

export const getProfissionaisByService = async (
  providerSlug: string,
  serviceId: number
): Promise<Profissional[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profissionais/${providerSlug}/${serviceId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar profissionais");
    }
    const data: any[] = await response.json();

    return data.map(p => ({
      id: p.id,
      nome: p.nome,
      urlFoto: p.urlFoto,
    }));
  } catch (error) {
    console.error("Erro ao carregar profissionais:", error);
    return [];
  }
};

export const getAvailableTimeSlots = async (
  professionalId: number,
  date: string
): Promise<Availability[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/horarios/${professionalId}/${date}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar horários");
    }
    const data: ApiTimeSlot[] = await response.json();

    return data.map(slot => ({
      startTime: slot.horario,
      isAvailable: slot.disponivel,
    }));
  } catch (error) {
    console.error("Erro ao carregar horários:", error);
    return [];
  }
};

export const getAutonomoProfissionalData = async (
  providerSlug: string
): Promise<Profissional | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/provedores-autonomos/${providerSlug}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do provedor autônomo");
    }
    const data: any = await response.json();

    return {
      id: data.id,
      nome: data.nome,
      urlFoto: data.urlFoto,
    };
  } catch (error) {
    console.error("Erro ao carregar dados do provedor autônomo:", error);
    return null;
  }
};
