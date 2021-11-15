import { useMemo } from "react";
import { useAddress } from "@arthuryeti/terra";

import { useGetStakerInfo } from "modules/pool";

export const useClaimableAmount = (contract: string) => {
  const address = useAddress();
  const { data } = useGetStakerInfo({
    stakingContract: contract,
    address,
  });

  return useMemo(() => {
    if (data == null) {
      return null;
    }

    return data.pending_reward;
  }, [data]);
};
