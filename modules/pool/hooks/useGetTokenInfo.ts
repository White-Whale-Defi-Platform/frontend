import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export const useGetTokenInfo = (contract: string) => {
  const { client } = useTerraWebapp();

  return useQuery(["tokenInfo", contract], () => {
    return client.wasm.contractQuery<{ total_supply: string }>(contract, {
      token_info: {},
    });
  });
};

export default useGetTokenInfo;
