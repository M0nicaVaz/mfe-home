import { formatCurrency } from 'shared/utils';

import { AMOUNT_FILTER_LIMITS } from '@/stores/transactionsStore';
import { useTransactionFilters } from '@/hooks/useTransactions';
import styles from './styles.module.scss';

export function RangeFilter() {
  const { minAmount, maxAmount, setAmountRange } = useTransactionFilters();
  const AMOUNT_RANGE = AMOUNT_FILTER_LIMITS.max - AMOUNT_FILTER_LIMITS.min;

  const minPercentage =
    ((minAmount - AMOUNT_FILTER_LIMITS.min) / AMOUNT_RANGE) * 100;
  const maxPercentage =
    ((maxAmount - AMOUNT_FILTER_LIMITS.min) / AMOUNT_RANGE) * 100;

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
  );
}
