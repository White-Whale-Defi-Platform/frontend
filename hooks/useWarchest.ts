import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerra } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { div, plus, times } from "libs/math";
import { useTokenPrice } from "modules/swap";
import { ONE_TOKEN } from "constants/constants";

export const useWarchest = () => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();
  const whaleToken = contracts[name].whaleToken;
  const warchest = contracts[name].warchest;
  const price = useTokenPrice(whaleToken);

  const { data: balData } = useQuery(["balance", whaleToken, warchest], () => {
    return client.wasm.contractQuery<{
      balance: string;
    }>(whaleToken, {
      balance: {
        address: warchest,
      },
    });
  });

  const whaleAmount = useMemo(() => {
    if (balData == null) {
      return null;
    }

    return balData.balance;
  }, [balData]);

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

    const whaleUst = times(whaleAmount, div(price, ONE_TOKEN));

    return plus(plus(whaleUst, ustAmount), lunaAmount);
  }, [whaleAmount, ustAmount, price, lunaAmount]);

  return {
    totalInUst,
    ustAmount,
    lunaAmount,
    whaleAmount,
  };
};

export default useWarchest;
