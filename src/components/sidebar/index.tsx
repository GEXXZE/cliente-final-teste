import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { FaHome, FaCalendarAlt, FaTools, FaUserCircle } from 'react-icons/fa';
import styles from './style.module.css'
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { FaPerson } from 'react-icons/fa6';

interface SidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export default function Sidebar({ isMenuOpen, closeMenu }: SidebarProps) {
    const { theme } = useTheme();
    const { usuario } = useUser();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        
        if (
            isMenuOpen &&
            navRef.current &&
            !navRef.current.contains(event.target as Node) &&
            !(event.target as HTMLElement).closest('#menu-toggle') && 
            !(event.target as HTMLElement).closest('[for="menu-toggle"]') 
        ) {
            closeMenu();
        }
        }

        if (isMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, closeMenu]);

    return (
            <nav ref={navRef} className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`} style={{ backgroundColor: theme.colors.background2}}>
                <button
                    className={styles.closeMenuIcon} 
                    style={{ color: theme.colors.text}}
                    onClick={closeMenu}
                    aria-label="Fechar menu"
                >
                    &times; 
                </button>
                <ul className={styles.navList}>
                    <li className={styles.navItem} style={{ color: theme.colors.text}}>
                        <Link to="/profissional/dashboard" onClick={closeMenu} className={styles.navLink}>
                            <FaHome className={styles.navIcon} />
                            Dashboard
                        </Link>
                    </li>
                    <li className={styles.navItem} style={{ color: theme.colors.text}}>
                        <Link to="/profissional/agenda" onClick={closeMenu} className={styles.navLink}>
                            <FaCalendarAlt className={styles.navIcon} />
                            Agenda
                        </Link>
                    </li>
                    <li className={styles.navItem} style={{ color: theme.colors.text}}>
                        <Link to="/servicos" onClick={closeMenu} className={styles.navLink}>
                          <FaTools className={styles.navIcon} />
                          Serviços
                        </Link>
                    </li>
                    <li className={styles.navItem} style={{ color: theme.colors.text}}>
                        <Link to="/contato" onClick={closeMenu} className={styles.navLink}>
                            <FaUserCircle className={styles.navIcon} />
                            Perfil
                        </Link>
                    </li>
                    {usuario?.Papel === 'EMPRESA' && (
                    <li className={styles.navItem} style={{ color: theme.colors.text}}>
                        <Link to="/profissional/profissionais" onClick={closeMenu} className={styles.navLink}>
                            <FaPerson className={styles.navIcon} />
                            Profissionais
                        </Link>
                    </li>
                )}
                </ul>
            </nav>
    )
}
