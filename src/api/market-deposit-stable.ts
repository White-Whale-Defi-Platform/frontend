import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from './validate-input';
import { validateAddress } from './validation/address';

import { validateIsGreaterThanZero } from './validation/number';
import { AddressProvider } from '../address-provider/provider';
import { MARKET_DENOMS } from '../address-provider/provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  amount: string;
}

/**
 *
 * @param address Client’s Terra address.
 * @param symbol Symbol of a stablecoin to deposit.
 * @param amount Amount of a stablecoin to deposit.
 */
export const fabricateMarketDepositStableCoin = ({
  address,
  market,
  amount,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([validateAddress(address), validateIsGreaterThanZero(amount)]);

  const mmContractAddress = addressProvider.market(market);

  return [
    new MsgExecuteContract(
      address,
      mmContractAddress,
      {
        // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L65
        deposit_stable: {},
      },

      // coins
      {
        [`${market}`]: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    ),
  ];
};
