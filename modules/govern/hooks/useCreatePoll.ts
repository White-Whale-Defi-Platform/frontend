import { useMemo } from "react";

import { toTerraAmount, useAddress, useTransaction } from "@arthuryeti/terra";
import { createCreatePollMsgs } from "modules/govern";
import useGovConfig from "./useGovConfig";

type Params = {
  tokenContract: string;
  govContract: string;
  amount?: string;
  data: any;
  onSuccess?: (txHash: string) => void;
};

export const useCreatePoll = ({
  tokenContract,
  govContract,
  amount,
  data,
  onSuccess,
}: Params) => {
  const address = useAddress();
  const config = useGovConfig();

  const msgs = useMemo(() => {
    if (data == null || data.title.length == 0) {
      return;
    }

    return createCreatePollMsgs(
      {
        tokenContract,
        govContract,
        amount: config.proposal_deposit,
        data,
      },
      address
    );
  }, [address, govContract, tokenContract, data, config]);

  return useTransaction({
    msgs,
    onSuccess,
  });
};

export default useCreatePoll;
