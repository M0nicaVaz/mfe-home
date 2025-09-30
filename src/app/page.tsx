'use client';

import { Dashboard } from '@/components/Dashboard';
import Header from '../components/Header';
import styles from './styles.module.scss';

export default function Home() {

  return (
    <div className={styles.main}>
      <div className={styles.layout}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
