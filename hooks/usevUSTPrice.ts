import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";
import { getAmountsInPool } from "libs/terra";
import { Pool } from "types/common";
import { ONE_TOKEN } from "constants/constants";

export const usevUSTPrice = () => {
  const { client } = useTerraWebapp();
  const { ustVault } = useContracts();

  const { data: pool } = useQuery("pool_state", () => {
    return client.wasm.contractQuery<Pool>(ustVault, {
      pool: {},
    });
  });

  const { data: vault_pool } = useQuery(
    ["pool_state", ustVault],
    () => {
      return client.wasm.contractQuery<{
        total_value_in_ust: string;
        total_share: string;
      }>(ustVault, {
        pool_state: {},
      });
    },
    {
      enabled: ustVault != null,
    }
  );

  

  return useMemo(() => {
    if (pool == null ||vault_pool==null) {
      return null;
    }

    const { uusd, other } = getAmountsInPool(pool);

    return num(+vault_pool.total_value_in_ust).div(+vault_pool.total_share).toFixed(3);
  }, [pool, vault_pool]);
};

export default usevUSTPrice;
