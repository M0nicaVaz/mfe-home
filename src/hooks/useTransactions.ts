'use client';

import { selectFilters, useFiltersStore } from '@/stores/filtersStore';
import {
  selectTransactions,
  useTransactionsStore,
} from '@/stores/transactionsStore';
import { TransactionsDataHook } from '@/types/transactions';
import { filterTransactions } from '@/utils/filterTransactions';
import { useEffect, useMemo } from 'react';

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
  const setCurrentPage = useFiltersStore((state) => state.setCurrentPage);
  const filteredTransactions = filterTransactions(transactions, filters);

  const { paginatedTransactions, totalPages } = useMemo(() => {
    const startIndex = (filters.currentPage - 1) * filters.itemsPerPage;
    const endIndex = startIndex + filters.itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredTransactions.length / filters.itemsPerPage);

    return { paginatedTransactions, totalPages };
  }, [filteredTransactions, filters.currentPage, filters.itemsPerPage]);

  return {
    transactions,
    filteredTransactions,
    paginatedTransactions,
    totalPages,
    currentPage: filters.currentPage,
    isLoading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setCurrentPage,
  };
}
