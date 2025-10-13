'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, verifyAuth } = useAuthStore();

  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  useEffect(() => {
    if (!isAuthenticated && !isPublicPath) {
      router.push('/login');
    }

    if (isAuthenticated && isPublicPath) {
      router.push('/');
    }
  }, [isAuthenticated, isPublicPath, router]);

  if (!isAuthenticated && !isPublicPath) {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
}
