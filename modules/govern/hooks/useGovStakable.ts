import { useBalance } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";

export const useGovStakable = () => {
  const { whaleToken } = useContracts();

  return useBalance(whaleToken);
};

export default useGovStakable;
