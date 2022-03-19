import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";
import { Pool, VaultPool } from "types/common";

import { GRAPHQL_URL } from "constants/constants";
import useContracts from "hooks/useContracts";

const query = gql`
  query {
    vault{
      apy
      apr
    }
  }
`;



export const useVaultApy = () => {
  const { client } = useTerraWebapp();
  const { ustVault, anchorOverseer } = useContracts();

  const { data: anchor }: any = useQuery("anchor", () => {
    return client.wasm.contractQuery<Pool>(anchorOverseer, {
      epoch_state: {},
    });
  });

  const apy = useMemo(() => {
    if (!anchor) return "0"

    const blocksPerYear = 4656810;
    const { deposit_rate } = anchor

    return num(deposit_rate).times(blocksPerYear).times(100).dp(2).toNumber()
  }, [anchor])


  // const { data } = useQuery("vaultApr", () => {
  //   return request(GRAPHQL_URL, query);
  // });

  // const { apr, apy } = useMemo(() => {
  //   return {
  //     apr: data?.vault.apr || "0.1",
  //     apy: data?.vault.apy
  //   }
  // }, [data])

  return ["0.1" , apy]
};

export default useVaultApy;
