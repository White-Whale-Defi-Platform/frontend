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
};

export const useDeposit = ({ contract, amount, token }: Params) => {
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

  const { fee, submit, result, error, reset } = useTransaction({
    msgs,
  });

  return {
    fee,
    result,
    error,
    deposit: submit,
  };
};

export default useDeposit;
