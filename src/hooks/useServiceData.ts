import { useState, useEffect } from 'react';
import api from '../services/api';
import { FormattedServiceData } from '@/interfaces/formattedServiceData';
import { Servico }  from '@/types/servico';

interface AutonomoData {
  tipo: 'AUTONOMO';
  prestador: { Id: number, Nome: string, FotoPerfil: string };
  servicos: Servico[];
  disponibilidade: any[];
}

interface EmpresaData {
  tipo: 'EMPRESA';
  prestador: { Id: number, Nome: string, FotoPerfil: string };
  profissionais: any[];
}

type ApiResponse = AutonomoData | EmpresaData;

export const useServiceData = (slug: string) => {
  const [data, setData] = useState<FormattedServiceData | null>(null);
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

        let formattedData: FormattedServiceData= {
          id: apiData.prestador.Id,
          name: apiData.prestador.Nome,
          profileImage: apiData.prestador.FotoPerfil || '',
          services: [],
          isAutonomous: false, 
          isEmpresa: false,    
        };

        if (apiData.tipo === 'AUTONOMO') {
          formattedData.services = apiData.servicos;
          formattedData.disponibilidade = apiData.disponibilidade;
          formattedData.isAutonomous = true;
        } else if (apiData.tipo === 'EMPRESA') {
          formattedData.services = apiData.profissionais;
          formattedData.isEmpresa = true;
        }
        else {
          throw new Error('Tipo de prestador desconhecido');
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