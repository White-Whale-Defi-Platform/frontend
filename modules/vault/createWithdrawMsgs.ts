import { MsgExecuteContract } from "@terra-money/terra.js";
import { toBase64 } from "@arthuryeti/terra";

type CreateWithdrawMsgsOptions = {
  contract: string;
  amount: string;
};

export const createWithdrawMsgs = (
  options: CreateWithdrawMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { contract, amount } = options;

  return [
    new MsgExecuteContract(sender, "lpToken", {
      send: {
        contract,
        amount,
        msg: toBase64({
          withdraw_liquidity: {},
        }),
      },
    }),
  ];
};
