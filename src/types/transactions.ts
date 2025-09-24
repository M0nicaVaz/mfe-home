import {
  Transaction,
  TransactionDirection,
  TransactionType,
} from '@/models/Transaction';

export type FiltersState = {
  searchTerm: string;
  typeFilter: TransactionType | '';
  directionFilter: TransactionDirection | '';
  startDate: string;
  endDate: string;
  minAmount: number;
  maxAmount: number;
};

export type TransactionFiltersHook = FiltersState & {
  setSearchTerm: (value: string) => void;
  setTypeFilter: (value: TransactionType | '') => void;
  setDirectionFilter: (value: TransactionDirection | '') => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setAmountRange: (range: { min: number; max: number }) => void;
  resetFilters: () => void;
};

export type TransactionsDataHook = {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (transaction: Transaction) => void;
};

export type TransactionsStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (transaction: Transaction) => void;
};

export type TransactionFiltersStore = {
  filters: FiltersState;
  setSearchTerm: (value: string) => void;
  setTypeFilter: (value: TransactionType | '') => void;
  setDirectionFilter: (value: TransactionDirection | '') => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setAmountRange: (range: { min: number; max: number }) => void;
  resetFilters: () => void;
};
