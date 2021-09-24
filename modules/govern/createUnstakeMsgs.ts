import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  govContract: string;
  amount: string;
};

export const createUnstakeMsgs = (options: Opts, sender: string) => {
  const { govContract, amount } = options;

  const executeMsg = {
    withdraw_voting_tokens: {
      amount,
    },
  };

  const msg = new MsgExecuteContract(sender, govContract, executeMsg);

  return [msg];
};
