import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './style.module.css';
import { useServiceData } from "@/hooks/useServiceData";
import ProfileHeader from "@/components/profileHeader";
import ServiceCard from "@/components/serviceCard";
import AppointmentModal from "@/components/appointmentModal";
import Loading from "@/components/loading"
import { Servico } from "@/types/servico";

export default function Agendar() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const { data, loading, error } = useServiceData(slug || '');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Servico | null>(null);

  const handleOpenModal = (service: Servico) => {
    console.log("Abrindo modal com os dados:");
    console.log("providerSlug:", slug);
    console.log("serviceId:", service.Id);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null); 
  };

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
      <ProfileHeader 
        prestador={{
          Id: data.id,
          Nome: data.name,
          FotoPerfil: data.profileImage
        }}  
      />
      
      <div className={styles.servicesList}>
        {data.services && Array.isArray(data.services) && data.services.length > 0 ? (
          data.services.map((service: Servico, index: number) => (
            <ServiceCard 
              key={index} 
              service={service} 
              onClick={() => handleOpenModal(service)}
            />
          ))
        ) : (
          <p>Nenhum serviço disponível para agendamento.</p>
        )}
      </div>

      {data && selectedService && (
        <AppointmentModal 
          show={isModalOpen}
          onClose={handleCloseModal}
          providerSlug={slug}
          serviceId={selectedService?.Id}      
        />
      )}
    </div>
  );
}