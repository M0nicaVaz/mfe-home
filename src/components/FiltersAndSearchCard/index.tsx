'use client';

import { Card, InputSelect, InputText, Button } from 'shared';
import { formatCurrency } from 'shared/utils';
import { TransactionType } from '@/models/Transaction';
import {
  AMOUNT_FILTER_LIMITS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/stores/transactionsStore';
import { useTransactionFilters } from '@/hooks/useTransactions';
import styles from './styles.module.scss';

const AMOUNT_RANGE = AMOUNT_FILTER_LIMITS.max - AMOUNT_FILTER_LIMITS.min;
const getAmountPercentage = (value: number) =>
  AMOUNT_RANGE === 0
    ? 0
    : ((value - AMOUNT_FILTER_LIMITS.min) / AMOUNT_RANGE) * 100;

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
    minAmount,
    maxAmount,
    setAmountRange,
    resetFilters,
  } = useTransactionFilters();

  const minPercentage = getAmountPercentage(minAmount);
  const maxPercentage = getAmountPercentage(maxAmount);

  const handleMinAmountChange = (value: number) => {
    const clampedValue = Math.max(
      AMOUNT_FILTER_LIMITS.min,
      Math.min(value, AMOUNT_FILTER_LIMITS.max)
    );

    const normalizedMin = Math.min(clampedValue, maxAmount);
    const normalizedMax = Math.max(maxAmount, normalizedMin);

    setAmountRange({ min: normalizedMin, max: normalizedMax });
  };

  const handleMaxAmountChange = (value: number) => {
    const clampedValue = Math.max(
      AMOUNT_FILTER_LIMITS.min,
      Math.min(value, AMOUNT_FILTER_LIMITS.max)
    );

    const normalizedMax = Math.max(clampedValue, minAmount);
    const normalizedMin = Math.min(minAmount, normalizedMax);

    setAmountRange({ min: normalizedMin, max: normalizedMax });
  };

  return (
    <div className={styles.container}>
      <Card title="Filtros e busca">
        <div className={styles.form}>
          <InputText
            name="search"
            labelText="Pesquisar"
            placeholder="Busque por tipo"
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
          <div className={styles.rangeControl}>
            <span className={styles.rangeLabel}>Faixa de valor (R$)</span>
            <div className={styles.sliderGroup}>
              <div className={styles.rangeTrack} />
              <div
                className={styles.rangeHighlight}
                style={{
                  left: `${Math.max(minPercentage, 0)}%`,
                  width: `${Math.max(maxPercentage - minPercentage, 0)}%`,
                }}
              />
              <input
                type="range"
                min={AMOUNT_FILTER_LIMITS.min}
                max={maxAmount}
                value={minAmount}
                onChange={(e) => handleMinAmountChange(Number(e.target.value))}
                className={`${styles.rangeInput} ${styles.rangeInputMin}`}
              />
              <input
                type="range"
                min={minAmount}
                max={AMOUNT_FILTER_LIMITS.max}
                value={maxAmount}
                onChange={(e) => handleMaxAmountChange(Number(e.target.value))}
                className={`${styles.rangeInput} ${styles.rangeInputMax}`}
              />
            </div>
            <div className={styles.rangeValues}>
              <span>{formatCurrency(minAmount)}</span>
              <span>{formatCurrency(maxAmount)}</span>
            </div>
          </div>
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
