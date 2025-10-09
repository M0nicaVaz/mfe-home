import MenuResponsive from "@/components/MenuResponsive";
import "../../../shared/styles/globals.scss";
import styles from "./styles.module.scss";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <title>Bytebank - Home</title>
      <head />
      <body>
        <div className={styles.container}>
          <MenuResponsive />
          {children}
        </div>
      </body>
    </html>
  );
}
