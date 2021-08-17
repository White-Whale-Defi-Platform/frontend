import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import { toToken } from "@arthuryeti/terra";

import { getIsTokenNative } from "libs/parse";

type CreateDepositMsgsOptions = {
  contract: string;
  token: string;
  amount: string;
};

export const createDepositMsgs = (
  options: CreateDepositMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { token, contract, amount } = options;
  const isNative = getIsTokenNative(token);
  const asset = toToken({ amount, token });

  if (isNative) {
    return [
      new MsgExecuteContract(
        sender,
        contract,
        {
          provide_liquidity: {
            asset,
          },
        },
        [new Coin(token, amount)]
      ),
    ];
  }

  return [
    new MsgExecuteContract(sender, contract, {
      provide_liquidity: {
        asset,
      },
    }),
  ];
};
