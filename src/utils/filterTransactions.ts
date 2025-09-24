import { DIRECTION_LABELS, TRANSACTION_TYPE_LABELS } from '@/constants/filters';
import { Transaction } from '@/models/Transaction';
import { FiltersState } from '@/types/transactions';

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export function filterTransactions(
  transactions: Transaction[],
  filters: FiltersState
) {
  const normalizedSearch = normalizeText(filters.searchTerm);

  return transactions.filter((transaction) => {
    if (filters.typeFilter && transaction.type !== filters.typeFilter) {
      return false;
    }

    if (
      filters.directionFilter &&
      transaction.direction !== filters.directionFilter
    ) {
      return false;
    }

    if (filters.startDate) {
      const transactionDate = new Date(transaction.date);
      const start = new Date(filters.startDate);
      if (transactionDate < start) {
        return false;
      }
    }

    if (filters.endDate) {
      const transactionDate = new Date(transaction.date);
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      if (transactionDate > end) {
        return false;
      }
    }

    if (
      transaction.amount < filters.minAmount ||
      transaction.amount > filters.maxAmount
    ) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const normalizedType = normalizeText(transaction.type);
    const normalizedTypeLabel = normalizeText(
      TRANSACTION_TYPE_LABELS[transaction.type]
    );
    const normalizedDirection = normalizeText(transaction.direction);
    const normalizedDirectionLabel = normalizeText(
      DIRECTION_LABELS[transaction.direction]
    );

    return (
      normalizedType.includes(normalizedSearch) ||
      normalizedTypeLabel.includes(normalizedSearch) ||
      normalizedDirection.includes(normalizedSearch) ||
      normalizedDirectionLabel.includes(normalizedSearch)
    );
  });
}
