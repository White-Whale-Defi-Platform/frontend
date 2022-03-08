import { useMemo } from "react";
import { useQuery } from "react-query";
import {
  useTerraWebapp,
  useAddress,
  useTransaction,
  useBalance,
  num,
} from "@arthuryeti/terra";

import { createDepositMsgs } from "modules/vault";
import { minus } from "libs/math";
import { useSwap } from "@arthuryeti/terraswap";
import useContracts from "hooks/useContracts";
import { useVault } from "modules/vault";
import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import { toAsset, isNativeToken, useSwapRoute, useTerraswap, useSwapSimulate, minAmountReceive } from "@arthuryeti/terraswap";
import { toBase64 } from "@arthuryeti/terra";
import ustToWhaleMsg from "./ustToWhaleMsg"
import useUstToWhaleSwap from './useUstToWhaleSwap'
import useWhaleToUstSwap from './useWhaleToUstSwap'


type Params = {
  token1: string;
  token2: string;
  amount1: string;
  amount2: string;
  slippage: string;
  reverse: boolean;
  onError: any;
  onSuccess: any;
};

export const useVaultSwap = (props: Params) => {

  const { token1, token2, amount1, amount2, slippage, reverse, onSuccess, onError } = props

  const { whaleToken } = useContracts();
  const isNative = isNativeToken(token1);
  const isWhaleToUst = token1 === whaleToken && token2 === 'uusd';

  const returnSwap = useSwap({ ...props })

  const returnUstSwap = useUstToWhaleSwap({ ...props })

  const returnWhaleSwap = useWhaleToUstSwap({ ...props })



  if (isNative)
    return returnUstSwap
  else if (isWhaleToUst )
    return returnWhaleSwap
  else
    return returnSwap;
};

export default useVaultSwap;
