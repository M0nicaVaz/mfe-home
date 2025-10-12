'use client';

import { selectFilters, useFiltersStore } from '@/stores/filtersStore';
import {
  selectTransactions,
  useTransactionsStore,
} from '@/stores/transactionsStore';
import { TransactionsDataHook } from '@/types/transactions';
import { filterTransactions } from '@/utils/filterTransactions';
import { useEffect } from 'react';

export function useTransactions(): TransactionsDataHook {
  const transactions = useTransactionsStore(selectTransactions);
  const isLoading = useTransactionsStore((state) => state.isLoading);
  const error = useTransactionsStore((state) => state.error);
  const fetchTransactions = useTransactionsStore(
    (state) => state.fetchTransactions
  );
  const addTransaction = useTransactionsStore((state) => state.addTransaction);
  const updateTransaction = useTransactionsStore(
    (state) => state.updateTransaction
  );
  const deleteTransaction = useTransactionsStore(
    (state) => state.deleteTransaction
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filters = useFiltersStore(selectFilters);
  const filteredTransactions = filterTransactions(transactions, filters);

  return {
    transactions,
    filteredTransactions,
    isLoading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
