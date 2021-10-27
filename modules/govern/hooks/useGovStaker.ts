import { useMemo } from "react";
import { useTerraWebapp, useAddress } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import useContracts from "hooks/useContracts";

export const useGovStaker = () => {
  const address = useAddress();
  const { client } = useTerraWebapp();
  const { gov } = useContracts();

  const { data, isLoading } = useQuery(
    ["staker", gov],
    () => {
      return client.wasm.contractQuery<{
        balance: string;
        locked_balance: any[];
      }>(gov, {
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
