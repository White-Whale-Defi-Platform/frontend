import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateClaimMsgsOptions = {
  contract: string;
};

export const createClaimPoolMsgs = (
  options: CreateClaimMsgsOptions,
  sender: string
) => {
  const { contract } = options;

  const executeMsg = {
    claim: {},
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return msg;
};
