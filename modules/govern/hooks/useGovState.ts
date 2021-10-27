import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import useContracts from "hooks/useContracts";

export const useGovState = () => {
  const { client } = useTerraWebapp();
  const { gov } = useContracts();

  const { data, isLoading } = useQuery(["govState", gov], () => {
    return client.wasm.contractQuery<{
      total_deposit: string;
    }>(gov, {
      state: {},
    });
  });

  if (data == null || isLoading) {
    return null;
  }

  return data;
};

export default useGovState;
