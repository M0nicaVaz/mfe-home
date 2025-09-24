'use client';

import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header';
import styles from './styles.module.scss';
import { useTransactions } from '@/hooks/useTransactions';

export default function Home() {
  const { transactions } = useTransactions();

  return (
    <div className={styles.main}>
      <div className={styles.layout}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <BalanceCard transactions={transactions} />
          Dashboard:
        </div>
      </div>
    </div>
  );
}
