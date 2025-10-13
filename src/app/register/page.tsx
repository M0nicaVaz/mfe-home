'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button, InputText, Card } from 'shared';
import styles from './styles.module.scss';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ name, email, password });
      router.push('/');
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Criar Conta">
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputText
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />

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
            minLength={6}
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Button>

          <p className={styles.link}>
            Já tem conta?{' '}
            <Link href="/login">Fazer login</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
