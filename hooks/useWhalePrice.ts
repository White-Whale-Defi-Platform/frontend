import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { getAmountsInPool } from "libs/terra";
import { Pool } from "types/common";

export const useWhalePrice = () => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const whaleUstPair = contracts[name].whaleUstPair;

  const { data: pool } = useQuery("pool", () => {
    return client.wasm.contractQuery<Pool>(whaleUstPair, {
      pool: {},
    });
  });

  return useMemo(() => {
    if (pool == null) {
      return null;
    }

    const { uusd, other } = getAmountsInPool(pool);

    return ((Number(uusd) / Number(other)) * 100000).toFixed();
  }, [pool]);
};

export default useWhalePrice;
