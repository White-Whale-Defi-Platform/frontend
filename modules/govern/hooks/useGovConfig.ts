import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import useContracts from "hooks/useContracts";

export const useGovConfig = () => {
  const { client } = useTerraWebapp();
  const { gov } = useContracts();

  const { data, isLoading } = useQuery(["govConfig", gov], () => {
    return client.wasm.contractQuery<{
      quorum: string;
      threshold: string;
    }>(gov, {
      config: {},
    });
  });

  if (data == null || isLoading) {
    return null;
  }

  return data;
};

export default useGovConfig;
