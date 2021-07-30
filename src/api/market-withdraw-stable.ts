import { Dec, Int, MsgExecuteContract } from "@terra-money/terra.js";
import { validateInput } from "./validate-input";
import { validateAddress } from "./validation/address";

import { validateIsGreaterThanZero } from "./validation/number";
import { AddressProvider } from "../address-provider/provider";
import { MARKET_DENOMS } from "../address-provider/provider";
import { tequilaContractAddresses } from "../env";

interface Option {
  address: string;
  market: MARKET_DENOMS;
  amount: string;
}

/**
 *
 * @param address Client’s Terra address.
 * @param symbol Symbol of a stablecoin to Withdraw.
 * @param amount Amount of a stablecoin to Withdraw.
 */
export const fabricateMarketRedeemStable =
  ({ address, market, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    const wwContract = addressProvider.market(market);

    return [
      new MsgExecuteContract(
        address,
        tequilaContractAddresses.wwUSTLpToken,
        {
          // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L65
          send: {
            contract: tequilaContractAddresses.wwUSTVault,
            amount: new Int(new Dec(amount).mul(1000000)).toString(),
            // msg: {
            //   withdraw_liquidity: {}
            // }
            msg:  btoa(JSON.stringify({withdraw_liquidity:{}}))

          },
        },
        // // coins
        // {
        //   [`${market}`]: new Int(new Dec(amount).mul(1000000)).toString(),
        // }
        
      ),
    ];
  };
