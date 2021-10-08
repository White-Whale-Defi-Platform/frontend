import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { div, plus, times } from "libs/math";
import { useGovTotalStaked } from "modules/govern";
import { ONE_TOKEN } from "constants/constants";
import { useWhalePrice } from "hooks/useWhalePrice";

export const useWarchest = () => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const warchest = contracts[name].warchest;
  const totalStakedAmount = useGovTotalStaked();
  const price = useWhalePrice();

  const whaleAmount = useMemo(() => {
    if (totalStakedAmount == null) {
      return null;
    }

    return times(totalStakedAmount, div(price, ONE_TOKEN));
  }, [totalStakedAmount, price]);

  const { data: bankData } = useQuery(["balance", "bank", warchest], () => {
    return client.bank.balance(warchest);
  });

  const { data: exchangeRate } = useQuery(["exchangeRate", "uusd"], () => {
    return client.oracle.exchangeRate("uusd");
  });

  const ustAmount = useMemo(() => {
    if (bankData == null || bankData.get("uusd") == null) {
      return null;
    }

    return bankData.get("uusd").amount.toString();
  }, [bankData]);

  const lunaAmount = useMemo(() => {
    if (
      bankData == null ||
      exchangeRate == null ||
      bankData.get("uluna") == null
    ) {
      return "0.00";
    }

    const lunaPrice = exchangeRate.amount.toString();
    const amount = bankData.get("uluna").amount.toString();

    return times(lunaPrice, amount);
  }, [bankData, exchangeRate]);

  const totalInUst = useMemo(() => {
    if (whaleAmount == null) {
      return null;
    }

    return plus(plus(whaleAmount, ustAmount), lunaAmount);
  }, [whaleAmount, ustAmount, lunaAmount]);

  return {
    totalInUst,
    ustAmount,
    lunaAmount,
    whaleAmount,
  };
};

export default useWarchest;
