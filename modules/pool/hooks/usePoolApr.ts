import { useMemo } from "react";
import { num, useBalance } from "@arthuryeti/terra";

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
import dayjs from "dayjs";

type Params = {
  stakingContract: string;
  lpTokenContract: string;
  pairContract: string;
};

export const usePoolApr = ({
  stakingContract,
  lpTokenContract,
  pairContract,
}: Params) => {
  const { whaleUstPair, whaleToken } = useContracts();
  const whalePrice = usePoolPrice(whaleUstPair);
  const { data: pool } = useGetPool(pairContract);
  const { data: config } = useGetStakingConfig(stakingContract);
  const stakedLpTokens = useBalance(lpTokenContract, stakingContract);
  const { data: totalLpTokens } = useGetTokenInfo(lpTokenContract);
  const timestamp = dayjs().unix();

  return useMemo(() => {
    if (
      pool == null ||
      config == null ||
      totalLpTokens == null ||
      stakedLpTokens == null
    ) {
      return "0.00";
    }

    const asset = findAssetInPool(pool, whaleToken);
    const ustAmountInPool = times(asset.amount, whalePrice);
    const scheduleStartTime = config.distribution_schedule[0];
    const scheduleEndTime = config.distribution_schedule[1];
    const scheduleAmount = config.distribution_schedule[2];

    if (config.distribution_schedule == null) {
      return "0";
    }

    if (timestamp < scheduleStartTime) {
      return "0";
    }

    const whaleDistributionPerSecond = div(
      div(scheduleAmount, scheduleEndTime - scheduleStartTime),
      ONE_TOKEN
    );
    const secondsPerMonth = 60 * 60 * 24 * 30;

    const stakedLpTokensRatio = div(stakedLpTokens, totalLpTokens.total_supply);
    const poolUstValue = div(times(ustAmountInPool, "2"), ONE_TOKEN);
    const yearlyLPRewardsInUST = num(whaleDistributionPerSecond)
      .times(secondsPerMonth)
      .times(whalePrice);

    if (gt(poolUstValue, "0")) {
      const shareOfPool = num(poolUstValue).times(stakedLpTokensRatio);

      return yearlyLPRewardsInUST.div(shareOfPool).times(100).toFixed(0);
    }

    return "0";
  }, [
    whaleToken,
    config,
    pool,
    whalePrice,
    timestamp,
    stakedLpTokens,
    totalLpTokens,
  ]);
};

export default usePoolApr;
