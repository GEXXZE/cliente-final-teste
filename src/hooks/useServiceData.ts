import { useState, useEffect } from 'react';
import api from '../services/api';
import Servico  from '@/types/servico';

interface ServiceData {
  name: string;
  profileImage: string;
  services: Servico[];
}

export const useServiceData = (slug: string) => {
  const [data, setData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.post(`Prestador/${slug}/dados-agendamento`);
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, error };
};