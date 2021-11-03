import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

import { GRAPHQL_URL } from "constants/constants";

const query = gql`
  query {
    vault {
      apy
    }
  }
`;

export const useVaultApy = () => {
  const { data } = useQuery("vaultApr", () => {
    return request(GRAPHQL_URL, query);
  });

  return useMemo(() => {
    console.log(data);
    if (data == null) {
      return "0";
    }

    return data.vault.apy;
  }, [data]);
};

export default useVaultApy;
