import { num } from "@arthuryeti/terra";
import dayjs from "dayjs";

export type Token = {
    decimals?: number;
    icon?: string;
    name?: string;
    protocol?: string;
    symbol: string;
    token?: string;
}

export type Pair = {
    dex: string;
    from: Token;
    to: Token;
}

export interface ArbTrades {
    timestamp: string;
    txhash: string;
    txHashLink: string;
    arbPairs: Pair[];
    vaultName: string;
    profit: string;
}

const vaults = {
    "terra13fwsh3j8gug52y5x3tmguj3fwhr6c7nxm9kl06": "UST"
}

const nativeTokens = {
    "uusd": {
        symbol: 'UST',
        icon: "/UST.png"

    },
    "uluna": {
        symbol: 'LUNA',
        icon: "/Luna.png"
    }
}

//get vault transactions from fcd
export const getTxs = async (contract) => {
    const url = `https://fcd.terra.dev/v1/txs?offset=0&limit=100&account=${contract}`
    const res = await fetch(url)
    return await res.json()
}

//get token info from terrafinder
export const getToken = async () => {
    const response = await fetch("https://assets.terra.money/cw20/tokens.json")
    const tokens = await response.json()
    return tokens.mainnet
}

const tokenOrNative = (assetInfo) => {
    const { native_token, token } = assetInfo
    const { denom } = native_token || {}
    const { contract_addr } = token || {}
    return denom || contract_addr
}


const buildRoutes = (trades, tokens): Pair[] => {

    const routes: Pair[] = []
    const pairs = trades.map(({ asset_info, dex }) => {
        const address = tokenOrNative(asset_info)
        const tokensWithNative = { ...tokens, ...nativeTokens }
        const token = tokensWithNative[address]
        const [dexName] = Object.keys(dex)
        return ({ token, dex: dexName })
    })
    pairs.forEach(({ dex }, index) => {
        const from = pairs[index].token
        const to = index + 1 === pairs.length
            ? pairs[0]?.token
            : pairs[index + 1]?.token
        routes.push({ dex, from, to })
    })
    return routes
}

export const getTrdes = (txs = [], tokens): ArbTrades[] => {

    const arbTrades: ArbTrades[] = []

    txs.forEach((trade: any) => {
        const { logs } = trade
        const [msg] = trade.tx.value.msg
        const { contract } = msg.value || {}
        const { trades } = msg.value.execute_msg.initiate_arbitrage
        const arbPairs: Pair[] = buildRoutes(trades, tokens)

        logs.forEach(({ events }: any) => {
            const wasm = events.filter(({ type }: any) => type === 'wasm')
            wasm.forEach((event: any) => {
                const [isSwap] = event.attributes.filter(({ key }: any) => key === 'action')

                if (!!isSwap) {
                    const txhash = trade.txhash
                    const txHashLink = `https://finder.terra.money/mainnet/tx/${txhash}`
                    const timestamp = dayjs(trade.timestamp).format('MM/DD/YYYY HH:mm:ss')
                    const [profit] = event.attributes
                        .filter(({ key }) => key === 'profit')
                        .map(({ value }) => num(value).div(1000000).dp(2).toNumber())

                    arbTrades.push({
                        timestamp,
                        txhash,
                        txHashLink,
                        arbPairs,
                        vaultName: vaults[contract],
                        profit,
                    })
                }
            })
        })
    })

    return arbTrades
}