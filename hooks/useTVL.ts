import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerra } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { minus } from "libs/math";

export const useTVL = () => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();
  const whaleToken = contracts[name].whaleToken;
  const aUstToken = contracts[name].aUstToken;
  const communityFund = contracts[name].communityFund;

  const { data: balData } = useQuery(["balance", communityFund], () => {
    return client.wasm.contractQuery<{
      balance: string;
    }>(whaleToken, {
      balance: {
        address: communityFund,
      },
    });
  });

  const whaleAmount = useMemo(() => {
    if (balData == null) {
      return null;
    }

    return balData.balance;
  }, [balData]);

  const { data: balUstData } = useQuery(["balance", communityFund], () => {
    return client.wasm.contractQuery<{
      balance: string;
    }>(aUstToken, {
      balance: {
        address: communityFund,
      },
    });
  });

  const ustAmount = useMemo(() => {
    if (balUstData == null) {
      return null;
    }

    return balUstData.balance;
  }, [balUstData]);

  return {
    ustAmount,
    whaleAmount,
  };
};

export default useTVL;
