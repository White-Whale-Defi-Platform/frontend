import { useMemo } from "react";
import { num, useBalance } from "@arthuryeti/terra";

import { plus } from "libs/math";
import { ONE_TOKEN } from "constants/constants";
import { useWhalePrice } from "hooks/useWhalePrice";
import useContracts from "hooks/useContracts";

export const useCommunityFund = () => {
  const { whaleToken, aUstToken, communityFund } = useContracts();
  const price = useWhalePrice();
  const whaleBalance = useBalance(whaleToken, communityFund);
  const aUstBalance = useBalance(aUstToken, communityFund);
  const ustBalance = useBalance("uusd", communityFund);

  const whaleInUst = useMemo(() => {
    if (whaleBalance == null || price == null) {
      return "0";
    }

    return num(whaleBalance)
      .div(ONE_TOKEN)
      .times(num(price).div(ONE_TOKEN))
      .toFixed(2);
  }, [whaleBalance, price]);

  const ustAmount = useMemo(() => {
    if (ustBalance == null || aUstBalance == null) {
      return "0";
    }

    return num(ustBalance).plus(aUstBalance).div(ONE_TOKEN).toFixed(2);
  }, [ustBalance, aUstBalance]);

  const totalInUst = useMemo(() => {
    if (whaleInUst == null || ustAmount == null) {
      return "0";
    }

    return plus(whaleInUst, ustAmount);
  }, [whaleInUst, ustAmount]);

  return {
    totalInUst,
    ustBalance: ustAmount,
    whaleInUst,
  };
};

export default useCommunityFund;
