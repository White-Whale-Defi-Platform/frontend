import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

import { GRAPHQL_URL } from "constants/constants";

const query = gql`
  query ($pairContract: String!) {
      pool(pairContract: $pairContract ) { 
        apr
    }
  }
`;

export const usePoolApr = (pairContract) => {
  const { data } = useQuery(`pool-apr-${pairContract}`, () => {
    return request(GRAPHQL_URL, query, { pairContract });
  });

  return useMemo(() => {
    if (data == null) {
      return [];
    }

    return data.pool.apr;
  }, [data]);
};

export default usePoolApr;
