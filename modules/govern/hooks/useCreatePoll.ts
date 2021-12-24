import { useMemo } from "react";

import { toTerraAmount, useAddress, useTransaction } from "@arthuryeti/terra";
import { createCreatePollMsgs } from "modules/govern";

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

  const msgs = useMemo(() => {
    if (data == null || data.title.length == 0) {
      return;
    }

    return createCreatePollMsgs(
      {
        tokenContract,
        govContract,
        amount: toTerraAmount(100),
        data,
      },
      address
    );
  }, [address, govContract, tokenContract, data]);

  return useTransaction({
    msgs,
    onSuccess,
  });
};

export default useCreatePoll;
