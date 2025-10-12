'use client';

import { useTransactions } from '@/hooks/useTransactions';
import BalanceCard from '../BalanceCard';
import styles from './styles.module.scss';
import ChartOrderSelector from './components/ChartOrderSelector';
import { ChartListItem } from '@/models/ChartListItem';
import Charts from './components/Charts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


export function Dashboard() {
  const { transactions, isLoading, error } = useTransactions();
  const defaultItems: ChartListItem[] = [
    {id: 1, label: 'Distribuição por tipo'},
    {id: 2, label: 'Saldo acumulado'},
    {id: 3, label: 'Receitas vs Despesas'},
    {id: 4, label: 'Transações com Anexo'},
  ];
  const [order, setOrder] = useState<ChartListItem[]>(defaultItems);

  if (isLoading && transactions.length === 0) {
    return <p>Carregando transações...</p>;
  }

  if (error) {
    return <p>Não foi possível carregar as transações: {error}</p>;
  }

  return (
    <section>
      <div className={styles.container}>
        <BalanceCard transactions={transactions} />
        <ChartOrderSelector defaultItems={defaultItems} setOrder={setOrder}/>
      </div>
      <div>
        <Charts transactions={transactions} order={order}/>
      </div>
    </section>
  );
}
