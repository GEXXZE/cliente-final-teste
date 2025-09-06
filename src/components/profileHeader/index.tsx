import styles from './style.module.css';

interface ProfileHeaderProps {
  name: string;
  profileImage: string;
}

export default function ProfileHeader({ name, profileImage }: ProfileHeaderProps) {
    return (
        <div className={styles.profileHeader}>
            <img src={profileImage} alt="Foto de Perfil" className={styles.profileImage} />
            <h2 className={styles.profileName}>{name}</h2>
        </div>
    )
}