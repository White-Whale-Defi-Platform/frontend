import { useMemo } from "react";
import { useQuery } from "react-query";
import {
  useTerraWebapp,
  useAddress,
  useTransaction,
  useBalance,
} from "@arthuryeti/terra";

import { createDepositMsgs } from "modules/vault";
import { minus } from "libs/math";

type Params = {
  contract: string;
  amount: string;
  token: string;
  onSuccess: () => void;
};

export const useDeposit = ({ contract, amount, token, onSuccess }: Params) => {
  const address = useAddress();
  const { client } = useTerraWebapp();
  const balance = useBalance("uusd");

  const { data } = useQuery("feeToDeposit", () => {
    return client.wasm.contractQuery<{ fee: { amount }[] }>(contract, {
      estimate_deposit_fee: { amount: balance },
    });
  });

  const depositedAmount = useMemo(() => {
    if (data == null) {
      return null;
    }

    return minus(amount, data.fee[0].amount);
  }, [data, amount]);

  const msgs = useMemo(() => {
    if (amount == null || !contract || !token) {
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

  const { submit, ...rest } = useTransaction({
    msgs,
    onSuccess,
  });

  return {
    depositedAmount,
    ...rest,
    deposit: submit,
  };
};

export default useDeposit;
