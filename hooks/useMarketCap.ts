import { useMemo } from "react";

import { ONE_TOKEN } from "constants/constants";
import { useCirculatingSupply } from "hooks/useCirculatingSupply";
import { useWhalePrice } from "hooks/useWhalePrice";
import { div, times } from "libs/math";
import { num } from "@arthuryeti/terra";


export const useMarketCap = () => {
  const price:any = useWhalePrice();
  const circSupply = useCirculatingSupply();

  return useMemo(() => {
    return num(circSupply).times(price / ONE_TOKEN).dp(0).toNumber();
  }, [circSupply, price]);
};

export default useMarketCap;
