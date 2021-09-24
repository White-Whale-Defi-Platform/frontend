import { useMemo } from "react";

import { isValidAmount, useAddress, useTransaction } from "@arthuryeti/terra";
import { createUnstakeMsgs } from "modules/govern";

type Params = {
  govContract: string;
  amount: string;
  onSuccess: () => void;
};

export const useUnstake = ({ govContract, amount, onSuccess }: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!isValidAmount(amount)) {
      return;
    }

    return createUnstakeMsgs(
      {
        govContract,
        amount,
      },
      address
    );
  }, [address, govContract, amount]);

  const { submit, ...rest } = useTransaction({ msgs, onSuccess });

  return {
    ...rest,
    deposit: submit,
  };
};

export default useUnstake;
