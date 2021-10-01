import { useMemo, useCallback } from "react";
import { Coins, Coin } from "@terra-money/terra.js";
import {
  useTerra,
  isValidAmount,
  useAddress,
  useTransaction,
} from "@arthuryeti/terra";

import { createDepositMsgs } from "modules/vault";
import { useQuery } from "react-query";
import useBalance from "hooks/useBalance";
import { minus } from "libs/math";

type Params = {
  contract: string;
  amount: string;
  token: string;
  onSuccess: () => void;
};

export const useDeposit = ({ contract, amount, token, onSuccess }: Params) => {
  const address = useAddress();
  const { client } = useTerra();
  const balance = useBalance("uusd");

  const { data } = useQuery("feeToDeposit", () => {
    return client.wasm.contractQuery<{ fee: { amount }[] }>(contract, {
      estimate_deposit_fee: { amount: balance },
    });
  });

  const maxAmount = useMemo(() => {
    if (data == null) {
      return null;
    }

    return minus(minus(balance, data.fee[0].amount), 2000000);
  }, [data, balance]);

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
    maxAmount,
    isLoading,
    isReady,
    fee,
    result,
    error,
    deposit: submit,
  };
};

export default useDeposit;
