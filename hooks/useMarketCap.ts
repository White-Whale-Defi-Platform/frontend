import { useMemo } from "react";

import { ONE_TOKEN } from "constants/constants";
import { useCirculatingSupply } from "hooks/useCirculatingSupply";
import { useWhalePrice } from "hooks/useWhalePrice";
import { div, times } from "libs/math";

export const useMarketCap = () => {
  const price = useWhalePrice();
  const circSupply = useCirculatingSupply();

  return useMemo(() => {
    return times(circSupply, div(price, ONE_TOKEN));
  }, [circSupply, price]);
};

export default useMarketCap;
