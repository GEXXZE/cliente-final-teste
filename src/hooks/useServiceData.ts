import { useState, useEffect } from 'react';
import api from '../services/api';
import { Servico }  from '@/types/servico';

interface AutonomoData {
  tipo: 'AUTONOMO';
  prestador: { Nome: string };
  servicos: Servico[];
  disponibilidade: any[];
}

interface EmpresaData {
  tipo: 'EMPRESA';
  prestador: { Nome: string };
  profissionais: any[];
}

type ApiResponse = AutonomoData | EmpresaData;

export const useServiceData = (slug: string) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<ApiResponse>(`Prestador/${slug}/dados-agendamento`);
        const apiData = response.data;

        let formattedData = {};

        if (apiData.tipo === 'AUTONOMO') {
          formattedData = {
            name: apiData.prestador.Nome,
            profileImage: '', // A API não retorna a imagem, então definimos como vazia
            services: apiData.servicos,
            disponibilidade: apiData.disponibilidade
          };
        } else if (apiData.tipo === 'EMPRESA') {
          formattedData = {
            name: apiData.prestador.Nome,
            profileImage: '',
            services: apiData.profissionais, // Tratamos 'profissionais' como 'servicos'
            isEmpresa: true
          };
        }

        setData(formattedData);
      } catch (err: any) {
        if (err.response) {
          setError(`Erro: ${err.response.status} - ${err.response.data.message || 'Erro no servidor'}`);
        } else {
          setError(err.message || "Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, error };
};