import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";
import { Anchor, columbus5, AddressProviderFromJson, MARKET_DENOMS, OperationGasParameters } from '@anchor-protocol/anchor.js'

import { GRAPHQL_URL } from "constants/constants";

const query = gql`
  query {
    vault{
      apr
    }
  }
`;

export const useVaultApy = () => {
  const { client } = useTerraWebapp();

  const { data: apy }: any = useQuery("anchor", async () => {
    const addressProvider = new AddressProviderFromJson(columbus5)
    const anchor = new Anchor(client, addressProvider)
    const anchorApy = await anchor.earn.getAPY({ market : MARKET_DENOMS.UUSD })
    return num(anchorApy).times(100).dp(2).toNumber()
  });

  const { data } = useQuery("vaultApr", () => request(GRAPHQL_URL, query));
  const { apr } = useMemo(() => ({apr: data?.vault.apr || "0"}), [data])

  return [apr , apy]
};

export default useVaultApy;
