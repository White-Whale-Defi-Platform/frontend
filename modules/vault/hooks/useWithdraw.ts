import { useMemo } from "react";
import { isValidAmount, useAddress, useTransaction } from "@arthuryeti/terra";

import { createWithdrawMsgs } from "modules/vault";

type Params = {
  contract: string;
  amount: string;
};

export const useWithdraw = ({ contract, amount }: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!isValidAmount(amount) || !contract) {
      return;
    }

    return createWithdrawMsgs(
      {
        contract,
        amount,
      },
      address
    );
  }, [contract, amount, address]);

  const { fee, submit, result, error, reset } = useTransaction({
    msgs,
  });

  return {
    fee,
    result,
    error,
    withdraw: submit,
  };
};

export default useWithdraw;
