import { MsgExecuteContract } from "@terra-money/terra.js";

import { toBase64 } from "@arthuryeti/terra";

type CreateStakeMsgsOptions = {
  amount: string;
  stakingContract: string;
  lpTokenContract: string;
};

export const createStakeMsgs = (
  options: CreateStakeMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { stakingContract, lpTokenContract, amount } = options;

  const executeMsg = {
    send: {
      contract: stakingContract,
      amount,
      msg: toBase64({
        bond: {},
      }),
    },
  };

  const msg = new MsgExecuteContract(sender, lpTokenContract, executeMsg);

  return [msg];
};
