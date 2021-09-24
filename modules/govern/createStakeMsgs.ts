import { MsgExecuteContract, Coin } from "@terra-money/terra.js";

import { toBase64 } from "@arthuryeti/terra";

type CreateStakeMsgsOptions = {
  tokenContract: string;
  govContract: string;
  amount: string;
};

export const createStakeMsgs = (
  options: CreateStakeMsgsOptions,
  sender: string
) => {
  const { tokenContract, govContract, amount } = options;

  const executeMsg = {
    send: {
      amount,
      contract: govContract,
      msg: toBase64({
        stake_voting_tokens: {},
      }),
    },
  };

  const msg = new MsgExecuteContract(sender, tokenContract, executeMsg);

  return [msg];
};
