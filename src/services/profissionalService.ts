import API_BASE_URL from "./api";
import { Profissional } from "@/types/profissional";
import { ApiTimeSlot } from "@/types/apiTimeSlot";
import { Availability } from "@/types/availability";

export const getProfissionaisByService = async (providerSlug: string, serviceId: number): Promise<Profissional[]> => {
  try {
    const url = `${API_BASE_URL}/Servico/${serviceId}/profissionais`;
    const response = await fetch(`${url}?providerSlug=${encodeURIComponent(providerSlug)}`);

     if (!response.ok) {
      throw new Error(`Erro ao buscar profissionais: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dados brutos da API:", data);

    const profissionais = data.map((p: any) => ({
      id: p.id ?? p.ID_USUARIO ?? p.id_usuario,
      nome: p.nome ?? p.NOME ?? p.Nome,
      urlFoto: p.FotoPerfil ?? p.foto_perfil ?? "",
    }));
    console.log("Profissionais formatados:", profissionais);

    return profissionais;
  } catch (error) {
    console.error("Erro ao carregar profissionais:", error);
    return [];
  }
};


export const getAvailableTimeSlots = async (
  professionalId: number,
  date: string,
  serviceId: number
): Promise<Availability[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Servico/horarios/${professionalId}/${date}?serviceId=${serviceId}`
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ao buscar horários: ${response.status} - ${text}`);
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

