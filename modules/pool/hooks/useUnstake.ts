import { useMemo } from "react";
import { isValidAmount, useAddress, useTransaction } from "@arthuryeti/terra";

import { createUnstakeMsgs } from "modules/pool";

type Params = {
  stakingContract: string;
  amount: string;
  onSuccess: () => void;
  onError: () => void;
};

export const useUnstake = ({
  stakingContract,
  amount,
  onSuccess,
  onError,
}: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!isValidAmount(amount)) {
      return;
    }

    return createUnstakeMsgs(
      {
        stakingContract,
        amount,
      },
      address
    );
  }, [address, stakingContract, amount]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useUnstake;
