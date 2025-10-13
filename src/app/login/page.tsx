'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { InputText, Card } from 'shared';
import styles from './styles.module.scss';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Login">
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputText
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          <InputText
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className={styles.link}>
            Não tem conta?{' '}
            <Link href="/register">Registrar</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
