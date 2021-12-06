import { useMemo } from "react";
import { useTransaction, useAddress } from "@arthuryeti/terra";

import { createUnstakeMsgs, useGetStakerInfo } from "modules/pool";
import useContracts from "hooks/useContracts";

type Params = {
  amount: string;
  onSuccess: (txHash: string) => void;
};

export const useUnstake = ({ amount, onSuccess }: Params) => {
  const address = useAddress();
  const { whaleUstStaking } = useContracts();
  const { data: stakerInfo } = useGetStakerInfo({
    stakingContract: whaleUstStaking,
    address,
  });

  const staked = useMemo(() => {
    if (stakerInfo == null) {
      return "0";
    }

    return stakerInfo.bond_amount;
  }, [stakerInfo]);

  const msgs = useMemo(() => {
    return createUnstakeMsgs(
      {
        stakingContract: whaleUstStaking,
        amount,
      },
      address
    );
  }, [address, amount, whaleUstStaking]);

  const state = useTransaction({
    msgs,
    onSuccess,
  });

  return {
    staked,
    ...state,
  };
};

export default useUnstake;
