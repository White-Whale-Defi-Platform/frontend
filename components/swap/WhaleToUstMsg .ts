import { toBase64 } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";


type Params = {
    sender: string;
    amount1: string;
    slippage: string;
    simulated: any;
    ustVault: string;
    vUSTPool: string;
    ustVaultLpToken: string;
    whaleToken: string;
}


const ustToWhaleMsg = (
    { sender, amount1, slippage, simulated, ustVault, vUSTPool, ustVaultLpToken, whaleToken }: Params) => {

    return [

        new MsgExecuteContract(sender, whaleToken, {
            send: {
                amount: amount1,
                contract: vUSTPool,
                msg: toBase64({
                    swap: {
                        max_spread: slippage,
                        belief_price: simulated.price,
                    },
                }),
            },
        }),

        new MsgExecuteContract(sender, ustVaultLpToken, {
            send: {
                contract: ustVault,
                amount: simulated.amount,
                msg: toBase64({
                    withdraw_liquidity: {},
                }),
            },
        }),


    ]


}

export default ustToWhaleMsg