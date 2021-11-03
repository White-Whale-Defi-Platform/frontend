import { useMemo } from "react";
import { useAddress, useTransaction, useTerraWebapp } from "@arthuryeti/terra";
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
  const { client } = useTerraWebapp();

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
    if (amount == null || !contract) {
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

  const { submit, ...rest } = useTransaction({
    // @ts-expect-error
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
