import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerra } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { div, plus, times } from "libs/math";
import { useTokenPrice } from "modules/swap";
import { ONE_TOKEN } from "constants/constants";

export const useCommunityFund = () => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();
  const whaleToken = contracts[name].whaleToken;
  const aUstToken = contracts[name].aUstToken;
  const communityFund = contracts[name].communityFund;
  const price = useTokenPrice(whaleToken);

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

  const totalInUst = useMemo(() => {
    if (whaleAmount == null) {
      return null;
    }

    const whaleUst = times(whaleAmount, div(price, ONE_TOKEN));

    return plus(whaleUst, balUstData.balance);
  }, [whaleAmount, balUstData, price]);

  return {
    totalInUst,
    ustAmount,
    whaleAmount,
  };
};

export default useCommunityFund;
