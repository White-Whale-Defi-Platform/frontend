import { useMemo } from "react";
import { useTransaction, useAddress } from "@arthuryeti/terra";
import { useLpToTokens, getTokenDenom } from "@arthuryeti/terraswap";

import { createWithdrawMsgs, useGetPool } from "modules/pool";

type Params = {
  pairContract: string;
  lpTokenContract: string;
  amount: string;
  onSuccess: (txHash: string) => void;
};

export const useWithdraw = ({
  pairContract,
  lpTokenContract,
  amount,
  onSuccess,
}: Params) => {
  const address = useAddress();
  const { data: pool } = useGetPool(pairContract);

  const tokenAmounts = useLpToTokens({
    pool,
    amount,
  });

  const token1 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[0].info);
  }, [pool]);

  const token2 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[1].info);
  }, [pool]);

  const msgs = useMemo(() => {
    return createWithdrawMsgs(
      {
        pairContract,
        lpTokenContract,
        amount,
      },
      address
    );
  }, [address, pairContract, lpTokenContract, amount]);

  const { submit, ...rest } = useTransaction({
    // @ts-expect-error
    msgs,
    onSuccess,
  });

  return {
    ...rest,
    token1,
    token2,
    tokenAmounts,
    withdraw: submit,
  };
};

export default useWithdraw;
