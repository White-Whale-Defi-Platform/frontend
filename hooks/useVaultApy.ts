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
    }
  }
`;



export const useVaultApy = () => {
  const { client } = useTerraWebapp();
  const { ustVault } = useContracts();


  const { data } = useQuery("vaultApr", () => {
    return request(GRAPHQL_URL, query);
  });
  const { data: pool } = useQuery("pool_state", () => {
    return client.wasm.contractQuery<VaultPool>(ustVault, {
      pool_state: {},
    });
  });
  const {apy, apr} =  useMemo(() => {
    if (pool == null || pool == undefined) {
      return "0";
    }

    const pool_value = +pool.total_value_in_ust / +pool.total_share;
    console.log(`Pool value is ${pool_value}`);
    // Take weeklyApr and get a N-day rolling average to 
    const weekly_apr = ((pool_value - 1) / 1) * 100;
    const apr = (weekly_apr /5) * 100;
    
    const apy = ((1 + apr / 100 / 365) ** 365 - 1) * 100;
    console.log(`Weakly APR is ${weekly_apr}`)
    console.log(`APR is ${apr}`)
    console.log(`APY is ${apy}`)
    return {apr: apr, apy:apy} as any
  }, [pool]);
  console.log(apr)
  return [apr, apy]
};

export default useVaultApy;
