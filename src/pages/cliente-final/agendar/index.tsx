import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
//import styles from './style.module.css';

interface Prestador {
  id: number;
  nome: string;
  slug: string;
  fotoPerfil?: string;
  email: string;
}

export default function Agendar() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const [prestador, setPrestador] = useState<Prestador | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://192.168.1.2:5000/api/Prestador/${slug}/dados-agendamento`);
        if (!res.ok) throw new Error('Erro ao carregar prestador');
        const data = await res.json();
        setPrestador(data.prestador);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [slug]);

  if (!slug) return <p>Slug não informado</p>;
  if (!prestador) return <p>Carregando dados do prestador...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Agendar com {prestador.nome}</h2>
      {prestador.fotoPerfil && (
        <img src={prestador.fotoPerfil} alt={prestador.nome} width={100} style={{ borderRadius: '50%' }} />
      )}
      <p>Email: {prestador.email}</p>
      <p>Slug: {prestador.slug}</p>

      {/* Aqui você coloca os cards de serviços, horários disponíveis, etc */}
    </div>
  );
}