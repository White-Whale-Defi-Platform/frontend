import { MsgExecuteContract } from "@terra-money/terra.js";

type Options = {
  govContract: string;
  pollId: number;
  vote: string;
  amount: string;
};

export const createVoteMsgs = (options: Options, sender: string) => {
  const { pollId, vote, amount, govContract } = options;

  const executeMsg = {
    cast_vote: {
      poll_id: pollId,
      vote,
      amount,
    },
  };

  const msg = new MsgExecuteContract(sender, govContract, executeMsg);

  return [msg];
};
