import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerra } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { useWarchest } from "hooks/useWarchest";
import { plus } from "libs/math";

export const useTVL = () => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();
  const { totalInUst: totalInWarchest } = useWarchest();
  const ustVault = contracts[name].ustVault;

  const { data: pool } = useQuery(["pool", ustVault], () => {
    return client.wasm.contractQuery<{
      total_value_in_ust: string;
      total_share: string;
    }>(ustVault, {
      pool: {},
    });
  });

  const totalInVault = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return pool.total_value_in_ust;
  }, [pool]);

  const total = useMemo(() => {
    if (totalInVault == null || totalInWarchest == null) {
      return null;
    }

    return plus(totalInVault, totalInWarchest);
  }, [totalInVault, totalInWarchest]);

  return {
    total,
    totalInVault,
    totalInWarchest,
  };
};

export default useTVL;
