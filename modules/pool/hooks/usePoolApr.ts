import { useMemo } from "react";
import { num, useBalance } from "@arthuryeti/terra";
import dayjs from "dayjs";

import {
  useGetPool,
  useGetStakingConfig,
  useGetTokenInfo,
  usePoolPrice,
} from "modules/pool";
import { div, times, gt } from "libs/math";
import { findAssetInPool } from "libs/terra";
import useContracts from "hooks/useContracts";
import { ONE_TOKEN } from "constants/constants";
import { useQuery } from "react-query";

type Params = {
  stakingContract: string;
  lpTokenContract: string;
  pairContract: string;
};

export const usePoolApr = () => {
  const { whaleUstPair } = useContracts();
  const { data } = useQuery("pool-apr", () => {
    return fetch(
      `https://api.coinhall.org/api/v1/charts/terra/pairs?pairs=${whaleUstPair}`
    ).then((res) => res.json());
  });

  return useMemo(() => {
    if (data == null || data[whaleUstPair] == null) {
      return 0;
    }

    const volume = data[whaleUstPair]?.asset1.volume24h / 1000000;
    const fee = volume * 0.003;
    const pool = (data[whaleUstPair]?.asset1.poolAmount * 2) / 1000000;
    const daily = fee / pool;
    const apr = daily * 365;

    return num(apr * 100)
      .dp(2)
      .toNumber();
  }, [data, whaleUstPair]);
};

export default usePoolApr;
