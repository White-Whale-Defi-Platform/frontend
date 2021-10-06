import { useMemo } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { useGetBalance } from "hooks/useGetBalance";

export const useGovTotalStaked = () => {
  const {
    network: { name },
  } = useTerraWebapp();
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
