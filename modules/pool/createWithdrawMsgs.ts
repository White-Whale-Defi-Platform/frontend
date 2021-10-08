import { toBase64 } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateWithdrawMsgsOptions = {
  pairContract: string;
  lpTokenContract: string;
  amount: string;
};

export const createWithdrawMsgs = (
  options: CreateWithdrawMsgsOptions,
  sender: string
) => {
  const { pairContract, lpTokenContract, amount } = options;

  const executeMsg = {
    send: {
      contract: pairContract,
      amount,
      msg: toBase64({
        withdraw_liquidity: {},
      }),
    },
  };

  const withdrawMsg = new MsgExecuteContract(
    sender,
    lpTokenContract,
    executeMsg
  );

  return [withdrawMsg];
};
