import { useQuery } from "react-query";

import contracts from "constants/contracts.json";
import { Poll } from "types/poll";
import { useTerraWebapp } from "@arthuryeti/terra";

export const usePoll = (pollId: number) => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const govContract = contracts[name].gov;

  const { data, isLoading, isError } = useQuery<Poll>(
    ["poll", pollId],
    () => {
      return client.wasm.contractQuery(govContract, {
        poll: { poll_id: pollId },
      });
    },
    {
      enabled: !!pollId,
    }
  );

  return {
    data,
    isLoading,
    isError,
  };
};

export default usePoll;
