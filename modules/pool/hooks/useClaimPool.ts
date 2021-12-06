import { useMemo } from "react";
import { useAddress, useTransaction } from "@arthuryeti/terra";

import { createClaimPoolMsgs } from "modules/pool";

type Params = {
  contract: string;
  onSuccess: (txHash: string) => void;
};

export const useClaimPool = ({ contract, onSuccess }: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    return [
      createClaimPoolMsgs(
        {
          contract,
        },
        address
      ),
    ];
  }, [address, contract]);

  const { submit, ...rest } = useTransaction({
    msgs,
    onSuccess,
  });

  return {
    ...rest,
    msgs,
    claim: submit,
  };
};

export default useClaimPool;
