import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateUnstakeMsgsOptions = {
  amount: string;
  stakingContract: string;
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
