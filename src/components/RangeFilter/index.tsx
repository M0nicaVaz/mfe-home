"use client";

import { formatCurrency } from "shared/utils";
import { AMOUNT_FILTER_LIMITS } from "@/stores/filtersStore";
import { useFilters } from "@/hooks/useFilters";
import styles from "./styles.module.scss";

export function RangeFilter() {
  const { minAmount, maxAmount, setAmountRange } = useFilters();
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

  const minId = "range-filter-min";
  const maxId = "range-filter-max";

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

        {/* Controle do valor mínimo */}
        <label htmlFor={minId} className={styles.srOnly}>
          Valor mínimo
        </label>
        <input
          id={minId}
          type="range"
          min={AMOUNT_FILTER_LIMITS.min}
          max={maxAmount}
          value={minAmount}
          onChange={(e) => handleMinAmountChange(Number(e.target.value))}
          className={`${styles.rangeInput} ${styles.rangeInputMin}`}
          aria-valuemin={AMOUNT_FILTER_LIMITS.min}
          aria-valuemax={maxAmount}
          aria-valuenow={minAmount}
          aria-label="Valor mínimo da faixa de preço"
          aria-describedby="range-filter-description"
        />

        {/* Controle do valor máximo */}
        <label htmlFor={maxId} className={styles.srOnly}>
          Valor máximo
        </label>
        <input
          id={maxId}
          type="range"
          min={minAmount}
          max={AMOUNT_FILTER_LIMITS.max}
          value={maxAmount}
          onChange={(e) => handleMaxAmountChange(Number(e.target.value))}
          className={`${styles.rangeInput} ${styles.rangeInputMax}`}
          aria-valuemin={minAmount}
          aria-valuemax={AMOUNT_FILTER_LIMITS.max}
          aria-valuenow={maxAmount}
          aria-label="Valor máximo da faixa de preço"
          aria-describedby="range-filter-description"
        />
      </div>

      <div id="range-filter-description" className={styles.rangeValues}>
        <span>{formatCurrency(minAmount)}</span>
        <span>{formatCurrency(maxAmount)}</span>
      </div>
    </div>
  );
}
