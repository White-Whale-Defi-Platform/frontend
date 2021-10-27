import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";

export const usePollVoters = (pollId: number) => {
  const { client } = useTerraWebapp();
  const { gov } = useContracts();

  const { data } = useQuery(
    ["voters", pollId],
    () => {
      return client.wasm.contractQuery<any>(gov, {
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
