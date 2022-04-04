import { useMemo } from "react";
import { useQuery } from "react-query";
import { useBalance, useTerraWebapp } from "@arthuryeti/terra";
import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/constants";

import useContracts from "hooks/useContracts";
import { minus } from "libs/math";

const query = gql`
  query {
    circulatingSupply {
      value
    }
  }
`;


export const useCirculatingSupply = () => {
  const { client } = useTerraWebapp();
  const { wallet, whaleToken } = useContracts();
  const balance = useBalance(whaleToken, wallet);

  const { data } = useQuery("circulatingSupply", () => {
    return request(GRAPHQL_URL, query);
  });

  return useMemo(() => {
    if (!data?.circulatingSupply?.value) return null;
    
    return data.circulatingSupply.value
  }, [data])
};

export default useCirculatingSupply;
