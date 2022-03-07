import { num, useAddress, useTransaction } from "@arthuryeti/terra";
import { isNativeToken, minAmountReceive, toAsset, useSwapRoute, useSwapSimulate, useTerraswap } from "@arthuryeti/terraswap";
import useContracts from "hooks/useContracts";
import { useVault } from "modules/vault";
import { useMemo } from "react";
import WhaleToUstMsg from "./WhaleToUstMsg ";
import useSimulateWithVault from './useSimulateWithVault'


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

export const useWhaleToUstSwap = (props: Params) => {

  const { token1, token2, amount1, amount2, slippage, reverse, onSuccess, onError } = props

  const { ustVault, vUSTPool, ustVaultLpToken, whaleToken } = useContracts();
  const { vUstValue } = useVault({ contract: ustVault });

  const isNative = isNativeToken(token1);
  const asset = toAsset({ amount: amount1, token: token1 });
  const sender = useAddress();

  const { routes } = useTerraswap();
  const swapRoute = useSwapRoute({ routes, from: token1, to: ustVaultLpToken });


  const ustAmount = useMemo(() => {
    if (!amount2)
      return "0"

    return num(amount2).times(vUstValue).dp(0).toString()
  }, [vUstValue, amount2])

  const simulated = useSwapSimulate({
    swapRoute,
    amount: reverse ? ustAmount : amount1,
    token: reverse ? ustVaultLpToken : token1,
    reverse,
  })


  const minReceive = useMemo(() => {
    if (!simulated || !amount2) return

    return minAmountReceive({
      amount: reverse ? amount2 : simulated.amount,
      maxSpread: slippage,
    });
  }, [simulated, slippage, amount2, reverse]);



  const msgs = useMemo(() => {

    if (!simulated || !token1 || !amount1)
      return;

    if (swapRoute.length > 1) {
      return;
    }

    return WhaleToUstMsg({ ...props, sender, simulated, ustVault, vUSTPool, ustVaultLpToken, whaleToken })

  }, [token1, token2, amount1, amount2])



  const { submit, ...rest } = useTransaction({ msgs, onSuccess, onError });


  return ({
    ...rest,
    simulated,
    minReceive,
    swap: submit,
  });
}

export default useWhaleToUstSwap
