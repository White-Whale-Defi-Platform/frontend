import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

type Params = {
  stakingContract: string;
  address: string;
};

type Response = {
  bond_amount: string;
  pending_reward: string;
  reward_index: string;
  staker: string;
};

export const useGetStakerInfo = ({ stakingContract, address }: Params) => {
  const { client } = useTerraWebapp();
  const time = Math.floor(Date.now() / 1000);

  return useQuery(
    ["stakerInfo", stakingContract],
    () => {
      return client.wasm.contractQuery<Response>(stakingContract, {
        staker_info: {
          staker: address,
          timestamp: time,
        },
      });
    },
    {
      enabled: stakingContract != null,
    }
  );
};

export default useGetStakerInfo;
