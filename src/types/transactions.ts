import type {
  TransactionDTO as SharedTransactionDTO,
  TransactionDirection,
  TransactionType,
} from 'shared';
import { Transaction } from '@/models/Transaction';

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

export type TransactionDTO = SharedTransactionDTO;

export type TransactionsDataHook = {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (transaction: Transaction) => Promise<void>;
};

export type TransactionsStore = {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (transaction: Transaction) => Promise<void>;
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
