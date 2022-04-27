import { fromTerraAmount, num, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

const getAttr = (wasm = [], attr) => wasm.filter(({ key }) => key === attr);
const whale = 'terra1php5m8a6qd68z02t3zpw4jv2pj4vgw4wz0t8mz';
const vUst = 'terra1w0p5zre38ecdy3ez8efd5h9fvgum5s206xknrg';

const getTxs = async (contract: string) => {
    let next = 0
    const buyBack = [];

    do {

        try {
            const url = `https://fcd.terra.dev/v1/txs?offset=${next}&limit=100&account=${contract}`
            const res = await fetch(url)
            const data = await res.json()
            const { txs = [] } = data || {};

            txs.forEach((tx) => {
                const [log] = tx.logs || []
                const { events = [] } = log || {}
                const [wasm] = events.filter(l => l.type === 'wasm');
                const [offerAsset] = getAttr(wasm?.attributes, 'offer_asset');
                const [askAsset] = getAttr(wasm?.attributes, 'ask_asset');
                const [offerAmount] = getAttr(wasm?.attributes, 'offer_amount');
                const [returnAmount] = getAttr(wasm?.attributes, 'return_amount');
                if (offerAsset?.value === vUst && askAsset?.value === whale) {
                    buyBack.push({
                        offerAsset: offerAsset?.value,
                        askAsset: askAsset?.value,
                        offerAmount: offerAmount.value,
                        returnAmount: returnAmount.value,
                        txhash: tx.txhash,
                        timestamp: tx.timestamp
                    });
                }
            });


            next = data.next

        } catch (err) {
            null
        }
    } while (!!next);

    const totalBuy = buyBack
        .map(({ returnAmount }) => returnAmount)
        .reduce((prv, curr) => num(prv).plus(curr).toNumber(), 0)

    return { data: buyBack.slice(0, 10), totalBuy: fromTerraAmount(totalBuy) }
};

export const useBuyBack: any = () => {

    const {data = {}}  = useQuery(["buyback"], () => getTxs("terra1nnkt6uj7sxm96rlxhl5gm7r2hmvhj4fsrzhmtj"));

    return {...data}

};

export default useBuyBack;
