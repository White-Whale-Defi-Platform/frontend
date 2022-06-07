import { useMemo } from "react";
import { useTerraWebapp, useAddress } from "@arthuryeti/terra";
import { useQuery } from "react-query";
import {useConnectedWallet} from '@terra-money/wallet-provider';

import useContracts from "hooks/useContracts";

export const useGovStaked = () => {
  const connectedWallet = useConnectedWallet();
  const address = connectedWallet?.walletAddress
  console.log({address})
  const { gov } = useContracts();
  const { client } = useTerraWebapp();

  const { data: staker } = useQuery(["staker", gov], () => {
    return client.wasm.contractQuery<{ balance: string }>(gov, {
      staker: {
        address,
      },
    });
  });

  return useMemo(() => {
    if (staker == null) {
      return "0";
    }

    return staker.balance;
  }, [staker]);
};

export default useGovStaked;
