import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";

export const usePollVoters = (pollId: number) => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const govContract = contracts[name].gov;

  const { data } = useQuery(
    ["voters", pollId],
    () => {
      return client.wasm.contractQuery<any>(govContract, {
        voters: { poll_id: pollId },
      });
    },
    {
      enabled: !!pollId,
    }
  );

  return useMemo(() => {
    if (data == null) {
      return null;
    }

    return data.voters;
  }, [data]);
};

export default usePollVoters;
