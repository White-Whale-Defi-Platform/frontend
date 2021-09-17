import { useMemo } from "react";
import { isValidAmount, useAddress, useTransaction } from "@arthuryeti/terra";

import { createWithdrawMsgs } from "modules/vault";

type Params = {
  contract: string;
  lpToken: string;
  amount: string;
  onSuccess: () => void;
};

export const useWithdraw = ({
  contract,
  lpToken,
  amount,
  onSuccess,
}: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!isValidAmount(amount) || !contract) {
      return;
    }

    return createWithdrawMsgs(
      {
        contract,
        lpToken,
        amount,
      },
      address
    );
  }, [contract, amount, lpToken, address]);

  const { fee, submit, result, error, isLoading, isReady } = useTransaction({
    msgs,
    onSuccess,
  });

  return {
    isLoading,
    isReady,
    fee,
    result,
    error,
    withdraw: submit,
  };
};

export default useWithdraw;
