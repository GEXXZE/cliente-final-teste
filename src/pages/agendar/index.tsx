import { useSearchParams } from "react-router-dom";
import styles from './style.module.css';
import { useServiceData } from "@/hooks/useServiceData";
import ProfileHeader from "@/components/profileHeader";
import ServiceCard from "@/components/serviceCard";
import Loading from "@/components/loading"
import { Servico } from "@/types/servico";

export default function Agendar() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const { data, loading, error } = useServiceData(slug || '');

  if (!slug) {
    return <p>Slug não informado na URL. Verifique o código QR.</p>;
  }

  if (loading) {
    return (
      <div className={styles.center}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar dados: {error}. Tente novamente mais tarde.</p>;
  }

  if (!data || !data.name) {
    return <p>Nenhum prestador encontrado para o slug: {slug}.</p>;
  }
  return (
    <div className={styles.container}>
      <ProfileHeader name={data?.name} profileImage={data?.profileImage} />
      
      <div className={styles.servicesList}>
        {data.services && Array.isArray(data.services) && data.services.length > 0 ? (
          data.services.map((service: Servico, index: number) => (
            <ServiceCard key={index} service={service} />
          ))
        ) : (
          <p>Nenhum serviço disponível para agendamento.</p>
        )}
      </div>
    </div>
  );
}