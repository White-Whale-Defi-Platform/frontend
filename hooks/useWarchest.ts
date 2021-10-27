import { useMemo } from "react";
import { useQuery } from "react-query";
import { useBalance, useTerraWebapp } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";
import { div, plus, times } from "libs/math";
import { useGovTotalStaked } from "modules/govern";
import { ONE_TOKEN } from "constants/constants";
import { useWhalePrice } from "hooks/useWhalePrice";

export const useWarchest = () => {
  const { client } = useTerraWebapp();
  const { warchest } = useContracts();
  const totalStakedAmount = useGovTotalStaked();
  const price = useWhalePrice();
  const ustBalance = useBalance("uusd", warchest);
  const lunaBalance = useBalance("uluna", warchest);

  const whaleAmount = useMemo(() => {
    if (totalStakedAmount == null) {
      return null;
    }

    return times(totalStakedAmount, div(price, ONE_TOKEN));
  }, [totalStakedAmount, price]);

  const { data: exchangeRate } = useQuery(["exchangeRate", "uusd"], () => {
    return client.oracle.exchangeRate("uusd");
  });

  const lunaAmount = useMemo(() => {
    if (exchangeRate == null || lunaBalance == null) {
      return "0.00";
    }

    const lunaPrice = exchangeRate.amount.toString();

    return times(lunaPrice, lunaBalance);
  }, [lunaBalance, exchangeRate]);

  const totalInUst = useMemo(() => {
    if (whaleAmount == null || ustBalance == null || lunaAmount == null) {
      return null;
    }

    return plus(plus(whaleAmount, ustBalance), lunaAmount);
  }, [whaleAmount, ustBalance, lunaAmount]);

  return {
    totalInUst,
    ustAmount: ustBalance,
    lunaAmount,
    whaleAmount,
  };
};

export default useWarchest;
