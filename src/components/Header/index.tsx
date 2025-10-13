'use client';

import { IconButton } from "shared";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title} tabIndex={0}>
          {user?.name || 'Usuário'}
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <IconButton icon={<PersonIcon />} ariaLabel="Acessar perfil" />
          <IconButton icon={<LogoutIcon />} ariaLabel="Sair" onClick={handleLogout} />
        </div>
      </div>
    </header>
  );
}
