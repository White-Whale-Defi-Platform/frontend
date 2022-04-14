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


  const { data } = useQuery("vaultApr", () => request(GRAPHQL_URL, query));
  const { apr } = useMemo(() => ({apr: data?.vault.apr || "0"}), [data])

  return [apr , apy]
};

export default useVaultApy;
