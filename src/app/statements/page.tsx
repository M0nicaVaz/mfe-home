'use client';

import BalanceCard from '../../components/BalanceCard';
import NewTransactionCard from '../../components/NewTransactionCard';
import StatementList from '../../components/StatementList';
import { FiltersAndSearchCard } from '../../components/FiltersAndSearchCard';
import { useTransactions } from '@/hooks/useTransactions';
import styles from './styles.module.scss';
import Header from '@/components/Header';

export default function Home() {
  const {
    transactions,
    paginatedTransactions,
    isLoading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useTransactions();

  return (
    <div className={styles.main}>
      <div className={styles.layout}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <BalanceCard transactions={transactions} />
          <StatementList
            onDelete={deleteTransaction}
            transactions={paginatedTransactions}
            onUpdate={updateTransaction}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className={styles.right}>
          <FiltersAndSearchCard />
          <NewTransactionCard onAdd={addTransaction} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
