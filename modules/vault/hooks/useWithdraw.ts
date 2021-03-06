import { useMemo } from "react";
import {
  useAddress,
  useTerraWebapp,
  num,
} from "@arthuryeti/terra";
import numeral from "numeral";
import { useQuery } from "react-query";
import {useTransaction} from "modules/govern";

import { createWithdrawMsgs } from "modules/vault";
import { toAmount } from "libs/parse";

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
  const { client } = useTerraWebapp();

  const { data: pool } = useQuery(
    ["pool", contract],
    () => {
      return client.wasm.contractQuery<{
        total_value_in_ust: string;
        total_share: string;
      }>(contract, {
        pool_state: {},
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

    return numeral(pool.total_value_in_ust).divide(pool.total_share).value();
  }, [balData, pool]);

  const amountConverted = useMemo(() => {
    if (amount == null || ratio == null) {
      return null;
    }

    return num(amount).div(ratio).toString();
  }, [amount, ratio]);

  const msgs = useMemo(() => {
    if (amountConverted == null || !contract) {
      return;
    }

    return createWithdrawMsgs(
      {
        contract,
        lpToken,
        amount: toAmount(amountConverted),
      },
      address
    );
  }, [contract, amountConverted, lpToken, address]);

  const { submit, ...rest } = useTransaction({
    msgs,
    onSuccess,
  });

  return {
    ...rest,
    ratio,
    withdraw: submit,
  };
};

export default useWithdraw;
