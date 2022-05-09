import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";
import { getAmountsInPool } from "libs/terra";
import { Pool } from "types/common";

export const useUstPrice = () => {
  const { client } = useTerraWebapp();
  const { lunaUstPair } = useContracts();

  const { data: exchangeRate } = useQuery("exchangeRate", () => {
    return client.oracle.exchangeRate("uusd");
  });

  const { data: pool } = useQuery("pool", () => {
    return client.wasm.contractQuery<Pool>(lunaUstPair, {
      pool: {},
    });
  });

  return useMemo(() => {
    if (exchangeRate == null || pool == null) {
      return "0";
    }

    const lunaInUsd = exchangeRate?.amount.toString();

    const { uusd, other } = getAmountsInPool(pool);

    const lunaInUst = Number(uusd) / Number(other);

    return (Number(lunaInUsd) / lunaInUst).toFixed(4);
  }, [exchangeRate, pool]);
};

export default useUstPrice;
