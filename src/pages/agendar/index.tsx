import { useSearchParams } from "react-router-dom";
import styles from './style.module.css';
import { useServiceData } from "@/hooks/useServiceData";
import ProfileHeader from "@/components/profileHeader";
import ServiceCard from "@/components/serviceCard";
import LoadingSpinner from "@/components/loadingSpinner";


export default function Agendar() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const { data, loading, error } = useServiceData(slug || '');

  if (!slug) {
    return <p>Slug não informado</p>;
  }

  if (loading) {
    return (
      <div className={styles.center}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar dados: {error}</p>;
  }

  if (!data) {
    return <p>Nenhum dado encontrado</p>;
  }
  return (
    <div className={styles.container}>
      <ProfileHeader name={data.name} profileImage={data.profileImage} />
      <div className={styles.servicesList}>
        {data.services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
}