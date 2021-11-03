import { useMemo } from "react";
import { useAddress, useTransaction } from "@arthuryeti/terra";

import { createVoteMsgs } from "modules/govern";

type Params = {
  govContract: string;
  vote: string;
  pollId: number;
  amount: string;
  onSuccess: (txHash: string) => void;
};

export const useVote = ({
  govContract,
  vote,
  pollId,
  amount,
  onSuccess,
}: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount == null) {
      return null;
    }

    return createVoteMsgs(
      {
        govContract,
        pollId,
        vote,
        amount,
      },
      address
    );
  }, [address, govContract, vote, pollId, amount]);

  const { submit, ...rest } = useTransaction({
    // @ts-expect-error
    msgs,
    onSuccess,
  });

  return {
    ...rest,
    vote: submit,
  };
};

export default useVote;
