import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";
import type { TransactionsFilters } from "../services/transactionsService/getAll";

export function useTransactions(filters: TransactionsFilters) {
  const {data, isPending, refetch} = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  })

  return {
    transactions: data ?? [],
    isPending: isPending,
    refetchTransactions: refetch
  }
}