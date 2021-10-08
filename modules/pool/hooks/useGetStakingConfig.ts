import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export const useGetStakingConfig: any = (contract: string) => {
  const { client } = useTerraWebapp();

  return useQuery(["stakingConfig", contract], () => {
    return client.wasm.contractQuery(contract, {
      config: {},
    });
  });
};

export default useGetStakingConfig;
