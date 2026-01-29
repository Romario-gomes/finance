import { useEffect, useState } from "react";
import { useDashboard } from "../../../../components/DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  const { transactions, isPending, refetchTransactions } = useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]); 


  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
        if(value === filters[filter]) return;

        setFilters(prevState => ({
          ...prevState,
          [filter]: value,
        }))
      
    }
  }

  function handleApplyFilters(filters: { bankAccountId: string | undefined, year: number}) {
    handleChangeFilters('bankAccountId')( filters.bankAccountId);
    handleChangeFilters('year')( filters.year);
    setIsFiltersModalOpen(false);
  }


  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }
  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: isPending,
    transactions,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters
  }

}