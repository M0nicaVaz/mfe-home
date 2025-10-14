'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { InputText, Card } from 'shared';
import styles from './styles.module.scss';
import Image from 'next/image';
import dashboardImg from '@/assets/dashboard_img.png';

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
      <Image
        src={dashboardImg}
        alt="Visualização do dashboard da plataforma"
        width={400}
        height={400}
        objectFit="contain"
        priority
      />

      <Card title="Criar Conta">
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputText
            name="name"
            labelText="Nome"
            placeholder="Digite o seu nome completo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />

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
            placeholder="Mínimo 6 caracteres"
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
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </button>

          <p className={styles.link}>
            Já tem conta? <Link href="/login">Fazer login</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
