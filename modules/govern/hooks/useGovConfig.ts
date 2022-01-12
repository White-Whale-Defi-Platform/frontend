import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import useContracts from "hooks/useContracts";

type Response = {
  quorum: string;
  threshold: string;
  proposal_deposit: string;
};

export const useGovConfig = () => {
  const { client } = useTerraWebapp();
  const { gov } = useContracts();

  const { data, isLoading } = useQuery(["govConfig", gov], () => {
    return client.wasm.contractQuery<Response>(gov, {
      config: {},
    });
  });

  if (data == null || isLoading) {
    return null;
  }

  return data;
};

export default useGovConfig;
