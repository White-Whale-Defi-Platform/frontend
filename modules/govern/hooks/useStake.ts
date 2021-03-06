import { useMemo } from "react";

import { useAddress } from "@arthuryeti/terra";
import { createStakeMsgs } from "modules/govern";
import {useTransaction} from "modules/govern";

type Params = {
  tokenContract: string;
  govContract: string;
  amount: string;
  onSuccess: (txHash: string) => void;
};

export const useStake = ({
  tokenContract,
  govContract,
  amount,
  onSuccess,
}: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount == null) {
      return;
    }

    return createStakeMsgs(
      {
        tokenContract,
        govContract,
        amount,
      },
      address
    );
  }, [address, govContract, tokenContract, amount]);

  const { submit, ...rest } = useTransaction({
    msgs,
    onSuccess,
  });

  return {
    ...rest,
    deposit: submit,
  };
};

export default useStake;
