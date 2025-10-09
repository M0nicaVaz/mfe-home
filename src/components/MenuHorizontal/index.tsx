"use client";

import { Button } from "shared";
import styles from "./styles.module.scss";
import { items } from "shared/utils";

export default function MenuHorizontal() {
  return (
    <div>
      <nav className={styles.container}>
        <ul className={styles.content}>
          {items.map(({ label }) => {
            return <Button key={label} label={label} priority="tertiary" />;
          })}
        </ul>
      </nav>
    </div>
  );
}
