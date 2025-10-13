import MenuResponsive from "@/components/MenuResponsive";
import { AuthGuard } from "@/components/AuthGuard";
import "../../../shared/styles/globals.scss";
import styles from "./styles.module.scss";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <title>Bytebank - Home</title>
      <head />
      <body>
        <AuthGuard>
          <div className={styles.container}>
            <MenuResponsive />
            {children}
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}
