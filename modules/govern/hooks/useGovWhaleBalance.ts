import { useBalance } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";

export const useGovWhaleBalance = () => {
  const { whaleToken, gov } = useContracts();

  return useBalance(whaleToken, gov);
};

export default useGovWhaleBalance;
