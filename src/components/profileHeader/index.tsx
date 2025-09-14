import styles from './style.module.css';
import API_BASE_URL from '@/services/api';
import Prestador from '@/types/prestador';
import defaultProfileImg from '@/assets/imagemDefault.png';

interface ProfileHeaderProps {
  prestador: Prestador;
}

export default function ProfileHeader({ prestador }: ProfileHeaderProps) {
    const baseUrl = API_BASE_URL.defaults.baseURL?.replace('/api', '') + '/uploads/';
    const fotoUrl = prestador?.FotoPerfil
    ? `${baseUrl}${prestador.FotoPerfil}`
    : defaultProfileImg; 

    return (
        <div className={styles.profileHeader}>
            <img 
                src={fotoUrl} 
                alt="Foto de Perfil" 
                className={styles.profileImage} 
            />
            <h2 className={styles.profileName}>{prestador.Nome}</h2>
        </div>
    )
}