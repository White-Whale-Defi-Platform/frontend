import { MsgExecuteContract, Coin } from "@terra-money/terra.js";

import { toBase64 } from "@arthuryeti/terra";

import { getIsTokenNative } from "libs/parse";

type CreateCastVoteMsgsOptions = {
  tokenContract: string;
  govContract: string;
  poll_id: number;
  vote: string;
  amount: number;
};

export const createCastVoteMsgs = (
  options: CreateCastVoteMsgsOptions,
  sender: string
) => {
  const { tokenContract, govContract, poll_id, vote, amount } = options;
  const isNative = getIsTokenNative(tokenContract);

  if (isNative) {
    return [
      new MsgExecuteContract(
        sender,
        govContract,
        {
          cast_vote: {
            poll_id: poll_id,
            vote: vote,
            amount: amount,
          },
        },
        [new Coin(token, amount)]
      ),
    ];
  }

  return [
    new MsgExecuteContract(sender, govContract, {
      cast_vote: {
        poll_id: poll_id,
        vote: vote,
        amount: amount,
      },
    }),
  ];
};
