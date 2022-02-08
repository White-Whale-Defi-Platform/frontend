import { MARKET_DENOMS } from '@anchor-protocol/anchor.js';
import { UST, uUST } from '@anchor-protocol/types';
import { wwDepositTx } from './deposit_func';
import { useStream } from '@rx-stream/react';

import { useConnectedWallet } from '@terra-money/wallet-provider';
import {
  useRefetchQueries,
  useTerraWebapp,
} from '@terra-money/webapp-provider';
import { useCallback } from 'react';
// import { ANCHOR_TX_KEY } from '../../env';
import {
  useAnchorWebapp,
} from '@anchor-protocol/webapp-provider';
export interface EarnDepositTxParams {
  depositAmount: UST;
  txFee: uUST;
  onTxSucceed?: () => void;
}

export function useWWDepositTx() {
  const connectedWallet = useConnectedWallet();

  const { addressProvider, constants } = useAnchorWebapp();

  const { mantleEndpoint, mantleFetch, txErrorReporter } = useTerraWebapp();

  const refetchQueries = useRefetchQueries();

  const stream = useCallback(
    ({ depositAmount, txFee, onTxSucceed }: EarnDepositTxParams) => {
      if (!connectedWallet || !connectedWallet.availablePost) {
        throw new Error('Can not post!');
      }

      return wwDepositTx({
        // fabricateMarketDepositStableCoin
        address: connectedWallet.walletAddress,
        market: MARKET_DENOMS.UUSD,
        amount: depositAmount,
        // post
        network: connectedWallet.network,
        post: connectedWallet.post,
        txFee: txFee.toString() as uUST,
        gasFee: constants.gasFee,
        gasAdjustment: constants.gasAdjustment,
        addressProvider,
        // query
        mantleEndpoint,
        mantleFetch,
        // error
        txErrorReporter,
        // side effect
        onTxSucceed: () => {
          onTxSucceed?.();
          // refetchQueries(ANCHOR_TX_KEY.EARN_DEPOSIT);
        },
      });
    },
    [
      connectedWallet,
      addressProvider,
      constants.gasFee,
      constants.gasAdjustment,
      mantleEndpoint,
      mantleFetch,
      txErrorReporter,
      refetchQueries,
    ],
  );

  const streamReturn = useStream(stream);

  return connectedWallet ? streamReturn : [null, null];
}
