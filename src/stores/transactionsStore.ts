'use client';

import { create } from 'zustand';
import {
  fetchTransactions as fetchTransactionsApi,
  createTransaction as createTransactionApi,
  updateTransaction as updateTransactionApi,
  deleteTransaction as deleteTransactionApi,
} from '@/api/transactionsApi';
import { Transaction } from '@/models/Transaction';
import type {
  TransactionCreateInput,
  TransactionUpdateInput,
} from 'shared';
import { TransactionsStore } from '@/types/transactions';

const toCreatePayload = (transaction: Transaction): TransactionCreateInput => ({
  id: transaction.id,
  clientId: transaction.clientId,
  amount: transaction.amount,
  date: transaction.date,
  type: transaction.type,
  direction: transaction.direction,
  attachment: transaction.attachment,
});

const toUpdatePayload = (transaction: Transaction): TransactionUpdateInput => ({
  id: transaction.id,
  clientId: transaction.clientId,
  amount: transaction.amount,
  date: transaction.date,
  type: transaction.type,
  direction: transaction.direction,
  attachment: transaction.attachment,
});

const initialState = {
  transactions: [] as Transaction[],
  isLoading: false,
  error: null as string | null,
};

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  ...initialState,

  async fetchTransactions() {
    set((state) => ({ ...state, isLoading: true, error: null }));
    try {
      const transactions = await fetchTransactionsApi();
      set((state) => ({
        ...state,
        transactions,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao carregar transações';
      set((state) => ({
        ...state,
        error: message,
      }));
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  async addTransaction(transaction: Transaction) {
    set((state) => ({ ...state, isLoading: true, error: null }));
    try {
      const created = await createTransactionApi(toCreatePayload(transaction));
      set((state) => ({
        ...state,
        transactions: [created, ...state.transactions],
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao criar transação';
      set((state) => ({ ...state, error: message }));
      console.error('[transactionsStore] addTransaction error', error);
      throw error;
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  async updateTransaction(transaction: Transaction) {
    set((state) => ({ ...state, isLoading: true, error: null }));
    try {
      const updated = await updateTransactionApi(toUpdatePayload(transaction));
      set((state) => ({
        ...state,
        transactions: state.transactions.map((current) =>
          current.id === updated.id ? updated : current
        ),
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao atualizar transação';
      set((state) => ({ ...state, error: message }));
      console.error('[transactionsStore] updateTransaction error', error);
      throw error;
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  async deleteTransaction(transaction: Transaction) {
    set((state) => ({ ...state, isLoading: true, error: null }));
    try {
      await deleteTransactionApi(transaction.id);
      set((state) => ({
        ...state,
        transactions: state.transactions.filter(
          (current) => current.id !== transaction.id
        ),
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao excluir transação';
      set((state) => ({ ...state, error: message }));
      console.error('[transactionsStore] deleteTransaction error', error);
      throw error;
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));

export const selectTransactions = (state: TransactionsStore) =>
  state.transactions;
