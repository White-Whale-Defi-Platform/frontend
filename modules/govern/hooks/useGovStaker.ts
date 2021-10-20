import { useMemo } from "react";
import { useTerraWebapp, useAddress } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import contracts from "constants/contracts.json";

export const useGovStaker = () => {
  const address = useAddress();
  const {
    client,
    network: { name },
  } = useTerraWebapp();

  const { data, isLoading } = useQuery(
    ["staker", contracts[name].gov],
    () => {
      return client.wasm.contractQuery<{
        balance: string;
        locked_balance: any[];
      }>(contracts[name].gov, {
        staker: {
          address,
        },
      });
    },
    {
      keepPreviousData: true,
    }
  );

  return useMemo(() => {
    if (data == null || isLoading) {
      return null;
    }

    return data;
  }, [data, isLoading]);
};

export default useGovStaker;
