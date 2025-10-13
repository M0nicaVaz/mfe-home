'use client';

import MenuResponsive from "@/components/MenuResponsive";
import { AuthGuard } from "@/components/AuthGuard";
import "../../../shared/styles/globals.scss";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <title>Bytebank - Home</title>
      <head />
      <body>
        <AuthGuard>
          {isAuthPage ? (
            children
          ) : (
            <div className={styles.container}>
              <MenuResponsive />
              {children}
            </div>
          )}
        </AuthGuard>
      </body>
    </html>
  );
}
