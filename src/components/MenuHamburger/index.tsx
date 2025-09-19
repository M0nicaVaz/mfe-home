import { IconButton, MenuHamburgerContent, Button, Divider } from "shared";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles.module.scss";
import { useState } from "react";
import Link from "next/link";

export default function MenuHamburguer() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <IconButton
        icon={<MenuIcon />}
        priority="tertiary"
        onClick={() => setMenuOpen(true)}
      />
      <IconButton icon={<PersonIcon />} />

      <MenuHamburgerContent
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        content={
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <Button label="Início" priority="tertiary" />
                </Link>
              </li>
              <Divider />
              <li>
                <Link href="">
                  <Button label="Transferências" priority="tertiary" />
                </Link>
              </li>
              <Divider />
              <li>
                <Link href="">
                  <Button label="Investimentos" priority="tertiary" />
                </Link>
              </li>
              <Divider />
              <li>
                <Link href="">
                  <Button label="Outros serviços" priority="tertiary" />
                </Link>
              </li>
            </ul>
          </nav>
        }
      />
    </div>
  );
}
