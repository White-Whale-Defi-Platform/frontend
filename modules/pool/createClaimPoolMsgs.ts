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
    withdraw: {},
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return msg;
};
