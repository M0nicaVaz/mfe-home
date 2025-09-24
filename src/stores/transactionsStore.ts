'use client';

import { create } from 'zustand';
import { transactions as mockTransactions } from '@/data/index';
import {
  Transaction,
  TransactionDirection,
  TransactionType,
} from '@/models/Transaction';
import { FiltersState, TransactionsStore } from '@/types/transactions';

export const AMOUNT_FILTER_LIMITS = {
  min: 1,
  max: 100000,
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  depósito: 'Depósito',
  saque: 'Saque',
  investimento: 'Investimento',
  pagamento: 'Pagamento',
  transferência: 'Transferência',
  outro: 'Outro',
};

export const DIRECTION_LABELS: Record<TransactionDirection, string> = {
  income: 'Entrada',
  outcome: 'Saída',
};

export const TRANSACTION_TYPE_OPTIONS: {
  value: '' | TransactionType;
  label: string;
}[] = [
  { value: '', label: 'Todos os tipos' },
  { value: 'depósito', label: TRANSACTION_TYPE_LABELS['depósito'] },
  { value: 'saque', label: TRANSACTION_TYPE_LABELS['saque'] },
  { value: 'investimento', label: TRANSACTION_TYPE_LABELS['investimento'] },
  { value: 'pagamento', label: TRANSACTION_TYPE_LABELS['pagamento'] },
  {
    value: 'transferência',
    label: TRANSACTION_TYPE_LABELS['transferência'],
  },
  { value: 'outro', label: TRANSACTION_TYPE_LABELS['outro'] },
];

export const DIRECTION_OPTIONS: {
  value: '' | TransactionDirection;
  label: string;
}[] = [
  { value: '', label: 'Todas as direções' },
  { value: 'income', label: DIRECTION_LABELS.income },
  { value: 'outcome', label: DIRECTION_LABELS.outcome },
];

const initialFilters: FiltersState = {
  searchTerm: '',
  typeFilter: '',
  directionFilter: '',
  startDate: '',
  endDate: '',
  minAmount: AMOUNT_FILTER_LIMITS.min,
  maxAmount: AMOUNT_FILTER_LIMITS.max,
};

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  transactions: mockTransactions,
  filters: { ...initialFilters },
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
  setSearchTerm: (value: string) =>
    set((state) => ({ filters: { ...state.filters, searchTerm: value } })),
  setTypeFilter: (value: TransactionType | '') =>
    set((state) => ({ filters: { ...state.filters, typeFilter: value } })),
  setDirectionFilter: (value: TransactionDirection | '') =>
    set((state) => ({ filters: { ...state.filters, directionFilter: value } })),
  setStartDate: (value: string) =>
    set((state) => ({ filters: { ...state.filters, startDate: value } })),
  setEndDate: (value: string) =>
    set((state) => ({ filters: { ...state.filters, endDate: value } })),
  setAmountRange: ({ min, max }: { min: number; max: number }) =>
    set((state) => ({
      filters: { ...state.filters, minAmount: min, maxAmount: max },
    })),
  resetFilters: () => set({ filters: { ...initialFilters } }),
}));

export const selectTransactions = (state: TransactionsStore) =>
  state.transactions;
export const selectFilters = (state: TransactionsStore) => state.filters;
