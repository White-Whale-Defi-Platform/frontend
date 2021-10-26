import { useMemo } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { getAmountsInPool } from "libs/terra";
import { Pool } from "types/common";

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
  const {
    network: { name },
  } = useTerraWebapp();
  const whaleUstPair = contracts[name].whaleUstPair;

  // TODO: change to env variable
  const { data } = useQuery("whaleUstPriceTimes", () => {
    return request(
      // "http://localhost:4000/dev/graphql",
      "https://022rzgdsz2.execute-api.us-east-1.amazonaws.com/dev/graphql",
      query,
      { contractAddress: whaleUstPair }
    );
  });

  return useMemo(() => {
    if (data == null) {
      return [];
    }

    return data.pair.prices;
  }, [data]);
};

export default useWhalePriceTimes;
