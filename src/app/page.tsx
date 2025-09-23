'use client';

import { Transaction } from '@/models/Transaction';
import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header';
import styles from './styles.module.scss';
import { useState } from 'react';
import { transactions as mockTransactions } from '@/data/index';

export default function Home() {
  const [transactions] = useState<Transaction[]>(mockTransactions);

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
