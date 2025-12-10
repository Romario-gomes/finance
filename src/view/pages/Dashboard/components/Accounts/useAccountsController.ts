import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../../../components/DashboardContext/useDashboard";

export function useAccountsController () {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValueVisibility } = useDashboard();

  const [sliderState, setSliderState ] = useState({
    isBeginning: true,
    isEnd: false,
  });


  return {
    sliderState,
    windowWidth,
    setSliderState,
    areValuesVisible,
    toggleValueVisibility
  }
}