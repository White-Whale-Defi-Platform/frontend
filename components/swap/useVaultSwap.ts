import { isNativeToken, useSwap } from "@arthuryeti/terraswap";
import useContracts from "hooks/useContracts";
import useUstToWhaleSwap from './useUstToWhaleSwap';
import useWhaleToUstSwap from './useWhaleToUstSwap';



type Params = {
  token1: string;
  token2: string;
  amount1: string;
  slippage: string;
  reverse: boolean;
  onError: any;
  onSuccess: any;
};

export const useVaultSwap = (props: Params) => {

  const { token1, token2 } = props

  const { whaleToken } = useContracts();
  const isNative = isNativeToken(token1);
  const isWhaleToUst = token1 === whaleToken && token2 === 'uusd';

  const returnSwap = useSwap({ ...props, amount2: "" })
  const returnUstSwap = useUstToWhaleSwap({ ...props })
  const returnWhaleSwap = useWhaleToUstSwap({ ...props })



  if (isNative) return returnUstSwap
  else if (isWhaleToUst) return returnWhaleSwap
  else return returnSwap;
};

export default useVaultSwap;
