import { useMemo } from "react";
import { useTransaction, useAddress } from "@arthuryeti/terra";

import { createStakeMsgs } from "modules/pool";
import useContracts from "hooks/useContracts";

type Params = {
  lpTokenContract: string;
  amount: string;
  onSuccess: (txHash: string) => void;
};

export const useStake = ({ lpTokenContract, amount, onSuccess }: Params) => {
  const address = useAddress();
  const { whaleUstStaking } = useContracts();

  const msgs = useMemo(() => {
    return createStakeMsgs(
      {
        stakingContract: whaleUstStaking,
        lpTokenContract,
        amount,
      },
      address
    );
  }, [address, lpTokenContract, amount, whaleUstStaking]);

  return useTransaction({
    msgs,
    onSuccess,
  });
};

export default useStake;
