import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import contracts from "constants/contracts.json";

export const useGovState = () => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();

  const govContract = contracts[name].gov;

  const { data, isLoading } = useQuery(["govState", govContract], () => {
    return client.wasm.contractQuery<{
      total_deposit: string;
    }>(govContract, {
      state: {},
    });
  });

  if (data == null || isLoading) {
    return null;
  }

  return data;
};

export default useGovState;
