import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

import { GRAPHQL_URL } from "constants/constants";

const query = gql`
  {
    pool {
      apr
    }
  }
`;

export const usePoolApr = () => {
  const { data } = useQuery("pool-apr", () => {
    return request(GRAPHQL_URL, query);
  });

  return useMemo(() => {
    if (data == null) {
      return [];
    }

    return data.pool.apr;
  }, [data]);
};

export default usePoolApr;
