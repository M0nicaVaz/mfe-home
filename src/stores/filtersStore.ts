'use client';

import { create } from 'zustand';
import { TransactionDirection, TransactionType } from '@/models/Transaction';
import { FiltersState, TransactionFiltersStore } from '@/types/transactions';

export const AMOUNT_FILTER_LIMITS = {
  min: 1,
  max: 100000,
};

const initialFilters: FiltersState = {
  searchTerm: '',
  typeFilter: '',
  directionFilter: '',
  startDate: '',
  endDate: '',
  minAmount: AMOUNT_FILTER_LIMITS.min,
  maxAmount: AMOUNT_FILTER_LIMITS.max,
};

export const useFiltersStore = create<TransactionFiltersStore>((set) => ({
  filters: { ...initialFilters },
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

export const selectFilters = (state: TransactionFiltersStore) => state.filters;
