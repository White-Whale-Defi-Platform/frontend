import { useMemo } from "react";
import { useTerra, useAddress } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import contracts from "constants/contracts.json";

export const useGovStaked = () => {
  const address = useAddress();
  const {
    client,
    networkInfo: { name },
  } = useTerra();

  const { data: staker } = useQuery(["staker", contracts[name].gov], () => {
    return client.wasm.contractQuery<{ balance: string }>(contracts[name].gov, {
      staker: {
        address,
      },
    });
  });

  return useMemo(() => {
    if (staker == null) {
      return "0";
    }

    return staker.balance;
  }, [staker]);
};

export default useGovStaked;
