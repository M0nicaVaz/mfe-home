'use client';

import BalanceCard from '../../components/BalanceCard';
import NewTransactionCard from '../../components/NewTransactionCard';
import StatementList from '../../components/StatementList';
import { FiltersAndSearchCard } from '../../components/FiltersAndSearchCard';
import { useTransactionsData } from '@/hooks/useTransactions';
import styles from './styles.module.scss';

export default function Home() {
  const {
    transactions,
    filteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactionsData();

  return (
    <div className={styles.main}>
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
