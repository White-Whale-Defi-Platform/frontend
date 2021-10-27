import { useMemo } from "react";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { useTerraWebapp } from "@arthuryeti/terra";

import { GRAPHQL_URL } from "constants/constants";
import useContracts from "hooks/useContracts";

const query = gql`
  query {
    tvl {
      value
      createdAt
    }
  }
`;

export const useTVL = () => {
  const { client } = useTerraWebapp();
  const { ustVault } = useContracts();

  const { data: pool } = useQuery(["pool", ustVault], () => {
    return client.wasm.contractQuery<{
      total_value_in_ust: string;
      total_share: string;
    }>(ustVault, {
      pool: {},
    });
  });

  const total = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return pool.total_value_in_ust;
  }, [pool]);

  const { data } = useQuery("tvl", () => {
    return request(GRAPHQL_URL, query);
  });

  const graph = useMemo(() => {
    if (data == null) {
      return [];
    }

    return data.tvl.reverse();
  }, [data]);

  return {
    total,
    graph,
  };
};

export default useTVL;
