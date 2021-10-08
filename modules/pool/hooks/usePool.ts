import { useMemo } from "react";
import { useAddress, useBalance } from "@arthuryeti/terra";
import {
  getTokenDenom,
  useTokenPriceInUst,
  useLpToTokens,
  useTotalShareInUst,
} from "@arthuryeti/terraswap";

import {
  calculateSharePrice,
  useGetPool,
  useGetStakerInfo,
  calculateTokensAmounts,
} from "modules/pool";

type Params = {
  pairContract: string;
  lpTokenContract: string;
  stakingContract: string;
};

export const usePool: any = ({
  pairContract,
  lpTokenContract,
  stakingContract,
}: Params) => {
  const address = useAddress();
  const { data: pool } = useGetPool(pairContract);
  const balance = useBalance(lpTokenContract);
  const { data: stakerInfo } = useGetStakerInfo({ stakingContract, address });

  const staked = useMemo(() => {
    if (stakerInfo == null) {
      return "0.00";
    }

    return stakerInfo.bond_amount;
  }, [stakerInfo]);

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

  const token1Price = useTokenPriceInUst(token1);
  const token2Price = useTokenPriceInUst(token2);

  const myShareInUST = useMemo(() => {
    if (
      token1Price == null ||
      token2Price == null ||
      balance == null ||
      pool == null
    ) {
      return "0.00";
    }

    return calculateSharePrice(pool, balance, token1Price, token2Price);
  }, [pool, balance, token1Price, token2Price]);

  const tokenAmounts = useLpToTokens({
    pool,
    amount: staked,
  });

  const totalShareInUST = useTotalShareInUst({
    pool,
  });

  return {
    ...pool,
    staked,
    myShareInUST,
    totalShareInUST,
    tokenAmounts,
    token1,
    token2,
  };
};

export default usePool;
