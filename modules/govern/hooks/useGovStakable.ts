import { useTerra } from "@arthuryeti/terra";

import { useBalance } from "hooks/useBalance";
import contracts from "constants/contracts.json";

export const useGovStakable = () => {
  const {
    networkInfo: { name },
  } = useTerra();

  return useBalance(contracts[name].whaleToken);
};

export default useGovStakable;
