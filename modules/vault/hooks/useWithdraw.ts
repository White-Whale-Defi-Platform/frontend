import { useMemo } from "react";
import {
  isValidAmount,
  useAddress,
  useTransaction,
  useTerra,
} from "@arthuryeti/terra";
import numeral from "numeral";
import { useQuery } from "react-query";

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
  const { client } = useTerra();

  const { data: pool } = useQuery(
    ["pool", contract],
    () => {
      return client.wasm.contractQuery<{
        total_value_in_ust: string;
        total_share: string;
      }>(contract, {
        pool: {},
      });
    },
    {
      enabled: contract != null,
    }
  );

  const { data: balData } = useQuery(
    ["balance", lpToken, address],
    () => {
      return client.wasm.contractQuery<{ balance: string }>(lpToken, {
        balance: {
          address,
        },
      });
    },
    {
      enabled: contract != null,
    }
  );

  const ratio = useMemo(() => {
    if (balData == null || pool == null) {
      return "0";
    }

    return numeral("1000000")
      .multiply(pool.total_value_in_ust)
      .divide(pool.total_share)
      .value()
      .toFixed()
      .toString();
  }, [balData, pool]);

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
    ratio,
    isLoading,
    isReady,
    fee,
    result,
    error,
    withdraw: submit,
  };
};

export default useWithdraw;
