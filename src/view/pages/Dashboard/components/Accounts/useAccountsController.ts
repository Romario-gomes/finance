import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../../../components/DashboardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";

export function useAccountsController () {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValueVisibility, openNewAccountModal } = useDashboard();

  const [sliderState, setSliderState ] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
  })


  const currentBalance = useMemo(() => {
    if(!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    sliderState,
    windowWidth,
    setSliderState,
    areValuesVisible,
    toggleValueVisibility,
    isLoading: isFetching,
    openNewAccountModal,
    accounts: data,
    currentBalance
  }
}