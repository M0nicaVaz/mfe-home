"use client";

import { Button } from "shared";
import styles from "./styles.module.scss";
import { items } from "shared/utils";

import Link from "next/link";

export default function MenuSide() {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        {items.map(({ icon, label, href }) => {
          const IconComponent = icon;
          return (
            <Link key={label} href={href}>
              <Button
                key={label}
                label={label}
                priority="tertiary"
                reverse
                size="large"
                iconLeft={<IconComponent />}
                onClick={() => {}}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
