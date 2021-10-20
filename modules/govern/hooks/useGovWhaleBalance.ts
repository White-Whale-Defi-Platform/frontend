import { useBalance, useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";

export const useGovWhaleBalance = () => {
  const {
    network: { name },
  } = useTerraWebapp();
  const whaleToken = contracts[name].whaleToken;
  const govContract = contracts[name].gov;

  return useBalance(whaleToken, govContract);
};

export default useGovWhaleBalance;
