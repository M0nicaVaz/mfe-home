'use client';

import { create } from 'zustand';
import type { TransactionDirection, TransactionType } from 'shared';
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
  currentPage: 1,
  itemsPerPage: 10,
};

export const useFiltersStore = create<TransactionFiltersStore>((set) => ({
  filters: { ...initialFilters },
  setSearchTerm: (value: string) =>
    set((state) => ({ filters: { ...state.filters, searchTerm: value, currentPage: 1 } })),
  setTypeFilter: (value: TransactionType | '') =>
    set((state) => ({ filters: { ...state.filters, typeFilter: value, currentPage: 1 } })),
  setDirectionFilter: (value: TransactionDirection | '') =>
    set((state) => ({ filters: { ...state.filters, directionFilter: value, currentPage: 1 } })),
  setStartDate: (value: string) =>
    set((state) => ({ filters: { ...state.filters, startDate: value, currentPage: 1 } })),
  setEndDate: (value: string) =>
    set((state) => ({ filters: { ...state.filters, endDate: value, currentPage: 1 } })),
  setAmountRange: ({ min, max }: { min: number; max: number }) =>
    set((state) => ({
      filters: { ...state.filters, minAmount: min, maxAmount: max, currentPage: 1 },
    })),
  setCurrentPage: (page: number) =>
    set((state) => ({ filters: { ...state.filters, currentPage: page } })),
  setItemsPerPage: (items: number) =>
    set((state) => ({ filters: { ...state.filters, itemsPerPage: items, currentPage: 1 } })),
  resetFilters: () => set({ filters: { ...initialFilters } }),
}));

export const selectFilters = (state: TransactionFiltersStore) => state.filters;
