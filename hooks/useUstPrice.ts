import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";
import contracts from "constants/contracts.json";
import { getAmountsInPool } from "libs/terra";
import { Pool } from "types/common";

export const useUstPrice = () => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const lunaUstPair = contracts[name].lunaUstPair;

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

    return (lunaInUst / Number(lunaInUsd)).toFixed(4);
  }, [exchangeRate, pool]);
};

export default useUstPrice;
