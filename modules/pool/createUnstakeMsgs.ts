import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateUnstakeMsgsOptions = {
  stakingContract: string;
  amount: string;
};

export const createUnstakeMsgs = (
  options: CreateUnstakeMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { stakingContract, amount } = options;

  const executeMsg = {
    unbond: {
      amount,
    },
  };

  const msg = new MsgExecuteContract(sender, stakingContract, executeMsg);

  return [msg];
};
