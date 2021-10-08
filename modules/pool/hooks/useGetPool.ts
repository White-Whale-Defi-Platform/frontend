import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export const useGetPool: any = (pairContract: string) => {
  const { client } = useTerraWebapp();

  return useQuery(["pool", pairContract], () => {
    return client.wasm.contractQuery(pairContract, {
      pool: {},
    });
  });
};

export default useGetPool;
