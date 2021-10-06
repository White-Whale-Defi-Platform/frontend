import { useMemo } from "react";
import { useTerra } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import contracts from "constants/contracts.json";

export const useGetGovConfig: any = (govContract: string) => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();

  const { data: config } = useQuery(["govConfig", contracts[name].gov], () => {
    return client.wasm.contractQuery(contracts[name].gov, {
      config: {},
    });
  });

  return useMemo(() => {
    if (config == null) {
      return "No Config";
    }

    return config;
  }, [config]);
};

export default useGetGovConfig;
