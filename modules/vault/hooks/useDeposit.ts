import { useMemo, useCallback } from "react";
import { Coins, Coin } from "@terra-money/terra.js";
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
  const { client } = useTerra();

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

  const getFeeForMax = useCallback(
    async (a) => {
      const maxMsgs = createDepositMsgs(
        {
          token,
          contract,
          amount: a,
        },
        address
      );
      const res = await client.tx.estimateFee(address, maxMsgs, {
        gasPrices: new Coins([new Coin("uusd", 0.15)]),
        feeDenoms: ["uusd"],
      });

      console.log(res);

      return "0";
    },
    [msgs, contract, client, address, token]
  );

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
    getFeeForMax,
    deposit: submit,
  };
};

export default useDeposit;
