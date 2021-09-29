import { useMemo } from "react";
import { useTerra } from "@arthuryeti/terra";

import { useTokenPrice } from "modules/swap";
import contracts from "constants/contracts.json";
import { useCirculatingSupply } from "hooks/useCirculatingSupply";
import { div, times } from "libs/math";
import { ONE_TOKEN } from "constants/constants";

export const useMarketCap = () => {
  const {
    networkInfo: { name },
  } = useTerra();
  const price = useTokenPrice(contracts[name].whaleToken);
  const circSupply = useCirculatingSupply();

  return useMemo(() => {
    return times(circSupply, div(price, ONE_TOKEN));
  }, [circSupply, price]);
};

export default useMarketCap;
