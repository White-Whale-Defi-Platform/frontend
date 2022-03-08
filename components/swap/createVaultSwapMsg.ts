import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import useContracts from "hooks/useContracts";
import { toBase64 } from "@arthuryeti/terra";

const createVaultSwapMsg = ({ amountConverted, reverse, sender, asset, token1, amount1, vUstAmount, slippage, simulated, ustVault, ustVaultLpToken, vUSTPool , whaleToken}) => {

    if (reverse)

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
                    ustVault,
                    amount : amountConverted,
                    msg: toBase64({
                        withdraw_liquidity: {},
                    }),
                },
            }),
        ]

    else
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
                    amount: vUstAmount,
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

export default createVaultSwapMsg