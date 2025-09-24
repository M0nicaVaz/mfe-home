'use client';

import BalanceCard from '../../components/BalanceCard';
import Header from '../../components/Header';
import MenuResponsive from '../../components/MenuResponsive';
import NewTransactionCard from '../../components/NewTransactionCard';
import StatementList from '../../components/StatementList';
import { FiltersAndSearchCard } from '../../components/FiltersAndSearchCard';
import { useTransactionsData } from '@/hooks/useTransactions';
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';

export default function Home() {
  const {
    transactions,
    filteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactionsData();

  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 599 });

  return (
    <div className={styles.main}>
      <div className={styles.layout}>{!isMobile && <Header />}</div>
      {isTablet && (
        <div className={styles.menuTablet}>
          <MenuResponsive />
        </div>
      )}
      {isMobile && (
        <div className={styles.menuMobile}>
          <MenuResponsive />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.left}>
          <BalanceCard transactions={transactions} />
          <StatementList
            onDelete={deleteTransaction}
            transactions={filteredTransactions}
            onUpdate={updateTransaction}
          />
        </div>
        <div className={styles.right}>
          <FiltersAndSearchCard />

          <NewTransactionCard onAdd={addTransaction} />
        </div>
      </div>
    </div>
  );
}
