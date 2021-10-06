import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import { toAsset, isNativeToken } from "@arthuryeti/terraswap";

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
  const isNative = isNativeToken(token);
  const asset = toAsset({ amount, token });

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
