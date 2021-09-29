import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerra } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { minus } from "libs/math";

export const useCirculatingSupply = () => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();
  const whaleToken = contracts[name].whaleToken;
  const wallet = contracts[name].wallet;

  const { data: tokenInfo } = useQuery<any>("tokenInfo", () => {
    return client.wasm.contractQuery<{
      token_supply: string;
    }>(whaleToken, {
      token_info: {},
    });
  });

  const { data: balData } = useQuery(["balance", wallet], () => {
    return client.wasm.contractQuery<{
      balance: string;
    }>(whaleToken, {
      balance: {
        address: wallet,
      },
    });
  });

  return useMemo(() => {
    if (balData == null || tokenInfo == null) {
      return null;
    }

    return minus(tokenInfo.total_supply, balData.balance);
  }, [balData, tokenInfo]);
};

export default useCirculatingSupply;
