import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import contracts from "constants/contracts.json";

export const useGovConfig = () => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();

  const govContract = contracts[name].gov;

  const { data, isLoading } = useQuery(["govConfig", govContract], () => {
    return client.wasm.contractQuery<{
      quorum: string;
      threshold: string;
    }>(govContract, {
      config: {},
    });
  });

  if (data == null || isLoading) {
    return null;
  }

  return data;
};

export default useGovConfig;
