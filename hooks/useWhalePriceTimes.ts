import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

import { GRAPHQL_URL } from "constants/constants";
import useContracts from "hooks/useContracts";

const query = gql`
  query ($contractAddress: ID!) {
    pair(contractAddress: $contractAddress) {
      contractAddress
      token1
      token2
      prices {
        token1
        token2
        createdAt
      }
    }
  }
`;

export const useWhalePriceTimes = () => {
  const { whaleUstPair } = useContracts();

  // TODO: change to env variable
  const { data } = useQuery("whaleUstPriceTimes", () => {
    return request(
      GRAPHQL_URL,
      // "https://022rzgdsz2.execute-api.us-east-1.amazonaws.com/dev/graphql",
      query,
      { contractAddress: whaleUstPair }
    );
  });

  return useMemo(() => {
    if (data == null || data.pair == null) {
      return [];
    }

    return data.pair.prices.sort((a , b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [data]);
};

export default useWhalePriceTimes;