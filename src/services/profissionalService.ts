import API_BASE_URL from "./api";
import { Profissional } from "@/types/profissional";
import { ApiTimeSlot } from "@/types/apiTimeSlot";
import { Availability } from "@/types/availability";

export const getProfissionaisByService = async (providerSlug: string, serviceId: number): Promise<Profissional[]> => {
  try {
    const response = await API_BASE_URL.get(
      `Servico/${serviceId}/profissionais`,{
        params: { providerSlug } 
      }
    );

    const data: any[] = response.data;

    return data.map(p => ({
      id: p.id,
      nome: p.nome,
      urlFoto: p.FotoPerfil,
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
      time: slot.horario,
      isAvailable: slot.disponivel,
    }));
  } catch (error) {
    console.error("Erro ao carregar horários:", error);
    return [];
  }
};

