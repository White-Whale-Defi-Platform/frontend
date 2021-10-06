import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { div, plus, times } from "libs/math";
import { ONE_TOKEN } from "constants/constants";
import { useWhalePrice } from "hooks/useWhalePrice";

export const useCommunityFund = () => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const whaleToken = contracts[name].whaleToken;
  const aUstToken = contracts[name].aUstToken;
  const communityFund = contracts[name].communityFund;
  const price = useWhalePrice();

  const { data: balData } = useQuery(
    ["balance", whaleToken, communityFund],
    () => {
      return client.wasm.contractQuery<{
        balance: string;
      }>(whaleToken, {
        balance: {
          address: communityFund,
        },
      });
    }
  );

  const whaleAmount = useMemo(() => {
    if (balData == null) {
      return null;
    }

    return times(balData.balance, div(price, ONE_TOKEN));
  }, [balData, price]);

  const { data: balUstData } = useQuery(
    ["balance", aUstToken, communityFund],
    () => {
      return client.wasm.contractQuery<{
        balance: string;
      }>(aUstToken, {
        balance: {
          address: communityFund,
        },
      });
    }
  );

  const ustAmount = useMemo(() => {
    if (balUstData == null) {
      return null;
    }

    return balUstData.balance;
  }, [balUstData]);

  const totalInUst = useMemo(() => {
    if (whaleAmount == null || ustAmount == null) {
      return null;
    }

    return plus(whaleAmount, ustAmount);
  }, [whaleAmount, ustAmount]);

  return {
    totalInUst,
    ustAmount,
    whaleAmount,
  };
};

export default useCommunityFund;
