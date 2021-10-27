import { useMemo } from "react";
import { useQuery } from "react-query";
import { useBalance, useTerraWebapp } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";
import { minus } from "libs/math";

export const useCirculatingSupply = () => {
  const { client } = useTerraWebapp();
  const { wallet, whaleToken } = useContracts();
  const balance = useBalance(whaleToken, wallet);

  const { data: tokenInfo } = useQuery("tokenInfo", () => {
    return client.wasm.contractQuery<{
      total_supply: string;
    }>(whaleToken, {
      token_info: {},
    });
  });

  return useMemo(() => {
    if (balance == null || tokenInfo == null) {
      return null;
    }

    return minus(tokenInfo.total_supply, balance);
  }, [balance, tokenInfo]);
};

export default useCirculatingSupply;
