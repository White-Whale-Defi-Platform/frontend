import { MsgExecuteContract, Coin } from "@terra-money/terra.js";

import { toBase64 } from "@arthuryeti/terra";

type Opts = {
  tokenContract: string;
  govContract: string;
  amount: string;
  data: any;
};

export const createCreatePollMsgs = (options: Opts, sender: string) => {
  const { tokenContract, govContract, amount, data } = options;

  const executeMsg = {
    send: {
      amount,
      contract: govContract,
      msg: toBase64({
        create_poll: data,
      }),
    },
  };

  const msg = new MsgExecuteContract(sender, tokenContract, executeMsg);

  return [msg];
};
