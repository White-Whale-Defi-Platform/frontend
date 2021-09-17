import { useMemo } from "react";
import {
  useTerra,
  isValidAmount,
  useAddress,
  useTransaction,
} from "@arthuryeti/terra";

import { createDepositMsgs } from "modules/vault";

type Params = {
  contract: string;
  amount: string;
  token: string;
  onSuccess: () => void;
};

export const useDeposit = ({ contract, amount, token, onSuccess }: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!isValidAmount(amount) || !contract || !token) {
      return;
    }

    return createDepositMsgs(
      {
        token,
        contract,
        amount,
      },
      address
    );
  }, [token, contract, amount, address]);

  const { fee, submit, result, error, isReady, isLoading } = useTransaction({
    msgs,
    onSuccess,
  });

  return {
    isLoading,
    isReady,
    fee,
    result,
    error,
    deposit: submit,
  };
};

export default useDeposit;
