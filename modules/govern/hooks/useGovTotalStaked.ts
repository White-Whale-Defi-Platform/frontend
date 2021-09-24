import { useMemo } from "react";
import { useTerra } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { useGetBalance } from "hooks/useGetBalance";

export const useGovTotalStaked = () => {
  const {
    networkInfo: { name },
  } = useTerra();
  const { data: balanceData } = useGetBalance({
    contract: contracts[name].whaleToken,
    address: contracts[name].gov,
  });

  return useMemo(() => {
    if (balanceData == null) {
      return "0";
    }

    return balanceData.balance;
  }, [balanceData]);
};

export default useGovTotalStaked;
