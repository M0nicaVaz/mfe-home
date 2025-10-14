'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { InputText, Card } from 'shared';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import dashboardImg from '@/assets/dashboard_img.png';

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
      <Image
        src={dashboardImg}
        alt="Visualização do dashboard da plataforma"
        width={400}
        height={400}
        objectFit="contain"
        priority
      />
      <Card title="Login">
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputText
            name="email"
            labelText="Email"
            placeholder="Digite seu email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <InputText
            name="password"
            labelText="Senha"
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className={styles.link}>
            Não tem conta? <Link href="/register">Registrar</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
