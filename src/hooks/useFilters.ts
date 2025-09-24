import { useFiltersStore } from '@/stores/filtersStore';
import { TransactionFiltersHook } from '@/types/transactions';

export function useFilters(): TransactionFiltersHook {
  const searchTerm = useFiltersStore((state) => state.filters.searchTerm);
  const typeFilter = useFiltersStore((state) => state.filters.typeFilter);
  const directionFilter = useFiltersStore(
    (state) => state.filters.directionFilter
  );
  const startDate = useFiltersStore((state) => state.filters.startDate);
  const endDate = useFiltersStore((state) => state.filters.endDate);
  const minAmount = useFiltersStore((state) => state.filters.minAmount);
  const maxAmount = useFiltersStore((state) => state.filters.maxAmount);

  const setSearchTerm = useFiltersStore((state) => state.setSearchTerm);
  const setTypeFilter = useFiltersStore((state) => state.setTypeFilter);
  const setDirectionFilter = useFiltersStore(
    (state) => state.setDirectionFilter
  );
  const setStartDate = useFiltersStore((state) => state.setStartDate);
  const setEndDate = useFiltersStore((state) => state.setEndDate);
  const setAmountRange = useFiltersStore((state) => state.setAmountRange);
  const resetFilters = useFiltersStore((state) => state.resetFilters);

  return {
    searchTerm,
    typeFilter,
    directionFilter,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    setSearchTerm,
    setTypeFilter,
    setDirectionFilter,
    setStartDate,
    setEndDate,
    setAmountRange,
    resetFilters,
  };
}
