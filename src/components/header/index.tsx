import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate  } from 'react-router-dom'
import styles from './style.module.css'
import { useTheme } from '../../contexts/ThemeContext';
import api from "@/services/api";
import Sidebar from '../sidebar'
import defaultProfileImg from '../../assets/imagemDefault.png';
import { useUser } from '@/contexts/UserContext';

export default function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { usuario } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseUrl = api.defaults.baseURL?.replace('/api', '') + '/uploads/';
  const fotoUrl = usuario?.FotoPerfil
  ? `${baseUrl}${usuario.FotoPerfil}`
  : defaultProfileImg; 

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

   const handleLogout = () => {
    // Limpa localStorage (ou onde armazena o login)
    localStorage.clear();

    // Redireciona pra página de login (ou onde quiser)
    navigate('/profissional/login');
  };

  return (
    <header className={styles.header} style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.bottom}}>
      <div className={styles.profileWrapper} ref={profileMenuRef}>
          <img 
            src={fotoUrl}
            className={styles.fotoPerfil} 
            style={{ borderColor: theme.colors.bottom}}
            onClick={handleProfileClick}
          />
        {isProfileMenuOpen && (
          <div className={styles.profileMenu} style={{ backgroundColor: theme.colors.background2}}>
            <Link to="/meu-perfil" style={{ color: theme.colors.text}}>Meu Perfil</Link>
            <Link to="/configuracoes" style={{ color: theme.colors.text}}>Configurações</Link>
            <button onClick={handleLogout}  style={{ color: theme.colors.text}}>Sair</button>
          </div>
        )}
      </div>

      <input
        type="checkbox"
        id="menu-toggle"
        className={styles.menuToggle}
        checked={isMenuOpen}
        onChange={handleMenuToggle}
        aria-label="Toggle menu"
      />
      <label htmlFor="menu-toggle" className={styles.menuIcon} style={{ color: theme.colors.text}}>
        &#9776;
      </label>
      <Sidebar isMenuOpen={isMenuOpen} closeMenu={closeMenu}/>
    </header>
  )
}