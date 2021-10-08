import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export const useGetStakingState = (contract: string) => {
  const { client } = useTerraWebapp();

  return useQuery(["stakingState", contract], () => {
    return client.wasm.contractQuery<{
      last_distributed: number;
      total_bond_amount: string;
      global_reward_index: string;
    }>(contract, {
      state: {},
    });
  });
};

export default useGetStakingState;
