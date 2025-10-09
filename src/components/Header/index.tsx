import { IconButton } from "shared";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./styles.module.scss";
import { clients } from "@/data";

export default function Header() {
  const client = clients[0];
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title} tabIndex={0}>
          {client.name}
        </h1>
        <IconButton icon={<PersonIcon />} ariaLabel="Acessar perfil" />
      </div>
    </header>
  );
}
