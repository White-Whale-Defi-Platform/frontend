import { UST } from '@anchor-protocol/types';
import {
  AnchorTokenBalances,
  EarnWithdrawFormStates,
} from '@anchor-protocol/webapp-fns';

import {
  wwWithdrawForm
} from './forms/withdraw-form'
import { useForm } from '@terra-dev/use-form';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useBank } from '@terra-money/webapp-provider';
import { useCallback, useMemo } from 'react';
import {
  useAnchorWebapp,
  useEarnEpochStatesQuery
} from '@anchor-protocol/webapp-provider';
// import { useEarnEpochStatesQuery } from '../../queries/earn/epochStates';
import { moneyMarket, uaUST, uUST } from '@anchor-protocol/types';
import big, { Big } from 'big.js';

export interface EarnWithdrawFormReturn extends EarnWithdrawFormStates {
  updateWithdrawAmount: (withdrawAmount: UST) => void;
}

export function computeTotalDeposit(
  userWWUSTBalance: wwUST | undefined,
  moneyMarketEpochState: moneyMarket.market.EpochStateResponse | undefined,
) {
  return big(userWWUSTBalance ?? '0').mul(
    moneyMarketEpochState?.exchange_rate ?? '1',
  ) as uUST<Big>;
}


export function computeUserDeposit(
  userWWUSTBalance: wwUST | undefined,
  moneyMarketEpochState: moneyMarket.market.EpochStateResponse | undefined,
) {
  return big(userWWUSTBalance ?? '0').mul(
    moneyMarketEpochState?.exchange_rate ?? '1',
  ) as uUST<Big>;
}

export type NominalType<T extends string> = { __type: T };
export type wwUST<T = string> = T & NominalType<'wwUST'>;
export interface WhiteWhaleTokenBalances extends AnchorTokenBalances {
    wwUST: wwUST
}
export function useWWWithdrawForm(): EarnWithdrawFormReturn {
  const connectedWallet = useConnectedWallet();

  const { constants } = useAnchorWebapp();

  const { tokenBalances } = useBank<WhiteWhaleTokenBalances>();

  const { data } = useEarnEpochStatesQuery();

  const { totalDeposit } = useMemo(() => {
    return {
      totalDeposit: computeTotalDeposit(
        tokenBalances.wwUST,
        data?.moneyMarketEpochState,
      ),
    };
  }, [data?.moneyMarketEpochState, tokenBalances.wwUST]);
  const [input, states] = useForm(
    wwWithdrawForm,
    {
      isConnected: !!connectedWallet,
      fixedGas: constants.fixedGas,
      userWWUSTBalance: tokenBalances.wwUST,
      totalDeposit: totalDeposit,
    },
    () => ({ withdrawAmount: '0' as UST }),
  );

  const updateWithdrawAmount = useCallback(
    (withdrawAmount: UST) => {
      input({
        withdrawAmount,
      });
    },
    [input],
  );

  return {
    ...states,
    updateWithdrawAmount,
  };
}
