import { num, useAddress, useTransaction } from "@arthuryeti/terra";
import { minAmountReceive, toAsset, useSwapRoute, useSwapSimulate, useTerraswap } from "@arthuryeti/terraswap";
import useContracts from "hooks/useContracts";
import { useVault } from "modules/vault";
import { useMemo } from "react";
import ustToWhaleMsg from "./ustToWhaleMsg";


type Params = {
  token1: string;
  token2: string;
  amount1: string;
  slippage: string;
  reverse: boolean;
  onError: any;
  onSuccess: any;
};

export const useUstToWhaleSwap = ({
  token1,
  token2,
  amount1,
  slippage,
  reverse,
  onSuccess,
  onError }: Params) => {

  const { ustVault, vUSTPool, ustVaultLpToken } = useContracts();
  const { vUstValue } = useVault({ contract: ustVault });
  const asset = toAsset({ amount: amount1, token: token1 });
  const sender = useAddress();

  const { routes } = useTerraswap();
  const swapRoute = useSwapRoute({ routes, from: ustVaultLpToken, to: token2 });

  const vUstAmount = useMemo(() => {

    if(!amount1)
      return "0"

    return num(amount1).div(vUstValue).minus(10000).dp(0).toString()
  }, [vUstValue, amount1])


  const simulated : any = useSwapSimulate({
    swapRoute,
    amount: vUstAmount,
    token: ustVaultLpToken,
    reverse,
  });


  const minReceive = useMemo(() => {
    if (!simulated ) return

    return minAmountReceive({
      amount:  simulated.amount,
      maxSpread: slippage,
    });
  }, [simulated, slippage]);

  const msgs = useMemo(() => {

    if (!simulated || !token1 || !amount1 || !vUstAmount)
      return;

      return ustToWhaleMsg({ sender, asset, token1, amount1, vUstAmount, slippage, simulated, ustVault, vUSTPool, ustVaultLpToken })

  }, [token1, token2, amount1, simulated, vUstAmount])

  const { submit, ...rest } = useTransaction({ msgs, onSuccess, onError });

    return ({
      ...rest,
      simulated,
      minReceive,
      swap: submit,
    });
  }

export default useUstToWhaleSwap
