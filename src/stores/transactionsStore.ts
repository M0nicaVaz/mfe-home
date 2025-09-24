'use client';

import { create } from 'zustand';
import { transactions as mockTransactions } from '@/data/index';
import { Transaction } from '@/models/Transaction';
import { TransactionsStore } from '@/types/transactions';

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  transactions: mockTransactions,
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((current) =>
        current.id === transaction.id ? transaction : current
      ),
    })),
  deleteTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (current) => current.id !== transaction.id
      ),
    })),
}));

export const selectTransactions = (state: TransactionsStore) =>
  state.transactions;
