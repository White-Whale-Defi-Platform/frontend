import { useMemo } from "react";
import { useTransaction, isValidAmount, useAddress } from "@arthuryeti/terra";

import { createStakeMsgs } from "modules/pool";

type Params = {
  stakingContract: string;
  lpTokenContract: string;
  amount: string;
  onSuccess: () => void;
  onError: () => void;
};

export const useStake = ({
  stakingContract,
  lpTokenContract,
  amount,
  onSuccess,
  onError,
}: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (
      !isValidAmount(amount) ||
      stakingContract == null ||
      lpTokenContract == null
    ) {
      return;
    }

    return createStakeMsgs(
      {
        stakingContract,
        lpTokenContract,
        amount,
      },
      address
    );
  }, [address, stakingContract, lpTokenContract, amount]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useStake;
