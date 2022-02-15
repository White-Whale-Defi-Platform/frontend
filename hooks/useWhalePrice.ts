import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";
import { getAmountsInPool } from "libs/terra";
import { Pool } from "types/common";
import { ONE_TOKEN } from "constants/constants";

export const useWhalePrice = () => {
  const { client } = useTerraWebapp();
  const { whaleUstPair } = useContracts();

  const { data: pool } = useQuery("pool_state", () => {
    return client.wasm.contractQuery<Pool>(whaleUstPair, {
      pool: {},
    });
  });

  return useMemo(() => {
    if (pool == null) {
      return null;
    }

    const { uusd, other } = getAmountsInPool(pool);

    return num(uusd).div(other).times(ONE_TOKEN).toFixed();
  }, [pool]);
};

export default useWhalePrice;
