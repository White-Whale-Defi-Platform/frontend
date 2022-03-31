import { useAddress, useTransaction } from "@arthuryeti/terra";
import { minAmountReceive, useSwapRoute, useSwapSimulate, useTerraswap } from "@arthuryeti/terraswap";
import useContracts from "hooks/useContracts";
import { useMemo } from "react";
import WhaleToUstMsg from "./WhaleToUstMsg ";


type Params = {
  token1: string;
  amount1: string;
  slippage: string;
  reverse: boolean;
  onError: any;
  onSuccess: any;
};

export const useWhaleToUstSwap = (props: Params) => {

  const { token1, amount1, slippage, reverse, onSuccess, onError } = props
  const { ustVault, vUSTPool, ustVaultLpToken, whaleToken } = useContracts();
  const sender = useAddress();
  const { routes } = useTerraswap();
  const swapRoute = useSwapRoute({ routes, from: token1, to: ustVaultLpToken });


  const simulated = useSwapSimulate({
    swapRoute,
    amount:  amount1,
    token:  token1,
    reverse,
  })


  const minReceive = useMemo(() => {
    if (!simulated ) return

    return minAmountReceive({
      amount:  simulated.amount,
      maxSpread: slippage,
    });
  }, [simulated, slippage]);



  const msgs = useMemo(() => {
    if (!simulated || !token1 || !amount1  ) return

    return WhaleToUstMsg({ amount1, slippage, sender, simulated, ustVault, vUSTPool, ustVaultLpToken, whaleToken })

  }, [token1, amount1, simulated])



  const { submit, ...rest } = useTransaction({ msgs, onSuccess, onError });


  return ({
    ...rest,
    simulated ,
    minReceive,
    swap: submit,
  });
}

export default useWhaleToUstSwap
