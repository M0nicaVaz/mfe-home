'use client';

import { selectFilters, useFiltersStore } from '@/stores/filtersStore';
import {
  selectTransactions,
  useTransactionsStore,
} from '@/stores/transactionsStore';
import { TransactionsDataHook } from '@/types/transactions';
import { filterTransactions } from '@/utils/filterTransactions';

export function useTransactions(): TransactionsDataHook {
  const transactions = useTransactionsStore(selectTransactions);
  const addTransaction = useTransactionsStore((state) => state.addTransaction);
  const updateTransaction = useTransactionsStore(
    (state) => state.updateTransaction
  );
  const deleteTransaction = useTransactionsStore(
    (state) => state.deleteTransaction
  );

  const filters = useFiltersStore(selectFilters);
  const filteredTransactions = filterTransactions(transactions, filters);

  return {
    transactions,
    filteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
