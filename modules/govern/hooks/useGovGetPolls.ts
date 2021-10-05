import { useMemo } from "react";
import { useTerra } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import contracts from "constants/contracts.json";

export const useGovGetPolls: any = (govContract: string) => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();

  const { data: polls } = useQuery(["govPolls", contracts[name].gov], () => {
    return client.wasm.contractQuery(contracts[name].gov, {
      polls: {
        filter: 'in_progress',
        order_by: 'desc',
      },
    });
  });

  return useMemo(() => {
    if (polls == null) {
      return "No Polls";
    }

    return polls;
  }, [polls]);
};

export default useGovGetPolls;
