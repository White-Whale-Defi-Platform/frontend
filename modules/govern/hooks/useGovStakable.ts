import { useTerraWebapp, useBalance } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";

export const useGovStakable = () => {
  const {
    network: { name },
  } = useTerraWebapp();

  return useBalance(contracts[name].whaleToken);
};

export default useGovStakable;
