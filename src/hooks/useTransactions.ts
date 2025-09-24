'use client';

import { useMemo } from 'react';
import { Transaction } from '@/models/Transaction';
import {
  DIRECTION_LABELS,
  selectFilters,
  selectTransactions,
  TRANSACTION_TYPE_LABELS,
  useTransactionsStore,
} from '@/stores/transactionsStore';
import {
  FiltersState,
  TransactionFiltersHook,
  TransactionsDataHook,
} from '@/types/transactions';

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const filterTransactions = (
  transactions: Transaction[],
  filters: FiltersState
) => {
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
};

export const useTransactionFilters = (): TransactionFiltersHook => {
  const searchTerm = useTransactionsStore((state) => state.filters.searchTerm);
  const typeFilter = useTransactionsStore((state) => state.filters.typeFilter);
  const directionFilter = useTransactionsStore(
    (state) => state.filters.directionFilter
  );
  const startDate = useTransactionsStore((state) => state.filters.startDate);
  const endDate = useTransactionsStore((state) => state.filters.endDate);
  const minAmount = useTransactionsStore((state) => state.filters.minAmount);
  const maxAmount = useTransactionsStore((state) => state.filters.maxAmount);

  const setSearchTerm = useTransactionsStore((state) => state.setSearchTerm);
  const setTypeFilter = useTransactionsStore((state) => state.setTypeFilter);
  const setDirectionFilter = useTransactionsStore(
    (state) => state.setDirectionFilter
  );
  const setStartDate = useTransactionsStore((state) => state.setStartDate);
  const setEndDate = useTransactionsStore((state) => state.setEndDate);
  const setAmountRange = useTransactionsStore((state) => state.setAmountRange);
  const resetFilters = useTransactionsStore((state) => state.resetFilters);

  return useMemo(
    () => ({
      searchTerm,
      typeFilter,
      directionFilter,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      setSearchTerm,
      setTypeFilter,
      setDirectionFilter,
      setStartDate,
      setEndDate,
      setAmountRange,
      resetFilters,
    }),
    [
      searchTerm,
      typeFilter,
      directionFilter,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      setSearchTerm,
      setTypeFilter,
      setDirectionFilter,
      setStartDate,
      setEndDate,
      setAmountRange,
      resetFilters,
    ]
  );
};

export const useTransactionsData = (): TransactionsDataHook => {
  const transactions = useTransactionsStore(selectTransactions);
  const addTransaction = useTransactionsStore((state) => state.addTransaction);
  const updateTransaction = useTransactionsStore(
    (state) => state.updateTransaction
  );
  const deleteTransaction = useTransactionsStore(
    (state) => state.deleteTransaction
  );

  const filters = useTransactionsStore(selectFilters);
  const {
    searchTerm,
    typeFilter,
    directionFilter,
    startDate,
    endDate,
    minAmount,
    maxAmount,
  } = filters;

  const filteredTransactions = useMemo(
    () =>
      filterTransactions(transactions, {
        searchTerm,
        typeFilter,
        directionFilter,
        startDate,
        endDate,
        minAmount,
        maxAmount,
      }),
    [
      transactions,
      searchTerm,
      typeFilter,
      directionFilter,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    ]
  );

  return useMemo(
    () => ({
      transactions,
      filteredTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
    }),
    [
      transactions,
      filteredTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
    ]
  );
};
