import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

import { GRAPHQL_URL } from "constants/constants";

const query = gql`
  query {
    gov {
      apr
    }
  }
`;

export const useGovApr = () => {
  const { data } = useQuery("govApr", () => {
    return request(GRAPHQL_URL, query);
  });

  return useMemo(() => {
    if (data == null || data.gov == null) {
      return "0";
    }

    return data.gov.apr;
  }, [data]);
};

export default useGovApr;
