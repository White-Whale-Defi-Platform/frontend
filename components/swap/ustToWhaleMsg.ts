import { toBase64 } from "@arthuryeti/terra";
import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import { num, useAddress, useTransaction } from "@arthuryeti/terra";

type Params = {
    sender: string;
    asset: any;
    token1: string;
    amount1: string;
    vUstAmount: string;
    slippage: string;
    simulated: any;
    ustVault: string;
    vUSTPool: string;
    ustVaultLpToken : string;
}

const ustToWhaleMsg = ({ sender, asset, token1, amount1, vUstAmount, slippage, simulated, ustVault, vUSTPool, ustVaultLpToken } : Params) => {
    return [
        new MsgExecuteContract(
            sender,
            ustVault,
            {
                provide_liquidity: {
                    asset,
                },
            },
            [new Coin(token1, amount1)]
        ),
        new MsgExecuteContract(sender, ustVaultLpToken, {
            send: {
                amount: num(vUstAmount).minus(simulated.spread).toString(),
                contract: vUSTPool,
                msg: toBase64({
                    swap: {
                        max_spread: slippage,
                        belief_price: simulated.price,
                    },
                }),
            },
        })
    ]


}

export default ustToWhaleMsg