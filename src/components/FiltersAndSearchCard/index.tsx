'use client';

import { Card, InputSelect, InputText, Button } from 'shared';
import { TransactionType } from '@/models/Transaction';
import { TRANSACTION_TYPE_OPTIONS } from '@/stores/transactionsStore';
import { useTransactionFilters } from '@/hooks/useTransactions';
import styles from './styles.module.scss';
import { RangeFilter } from '../RangeFilter';

export function FiltersAndSearchCard() {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilters,
  } = useTransactionFilters();

  return (
    <div className={styles.container}>
      <Card title="Filtros e busca">
        <div className={styles.form}>
          <InputText
            name="search"
            labelText="Pesquisar"
            placeholder="Busque por tipo ou direção"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputSelect
            name="type"
            labelText="Tipo de transação"
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as TransactionType | '')
            }
            options={TRANSACTION_TYPE_OPTIONS}
          />
          <InputText
            name="startDate"
            labelText="Data inicial"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <InputText
            name="endDate"
            labelText="Data final"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <RangeFilter />
        </div>
        <div className={styles.actions}>
          <Button
            label="Limpar filtros"
            priority="secondary"
            onClick={resetFilters}
          />
        </div>
      </Card>
    </div>
  );
}
