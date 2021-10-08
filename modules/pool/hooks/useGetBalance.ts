import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

type Params = {
  contract: string;
  address: string;
};

export const useGetBalance: any = ({ contract, address }: Params) => {
  const { client } = useTerraWebapp();

  return useQuery(["balance", contract], () => {
    return client.wasm.contractQuery(contract, {
      balance: {
        address,
      },
    });
  });
};

export default useGetBalance;
