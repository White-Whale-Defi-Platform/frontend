import { useMemo } from "react";
import { StdFee } from "@terra-money/terra.js";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useTerraswap, Tokens } from "@arthuryeti/terraswap";

const coinToString = (coin: any, tokens: Tokens) => {
  const amount = fromTerraAmount(coin.amount.toString(), "0,0.0[00000]");
  const symbol = tokens[coin.denom]?.symbol || "LP"; // TODO: <<= refactoring

  return `${amount} ${symbol}`;
};

const coinsToString = (coins: any, tokens: Tokens) => {
  return coins
    .toArray()
    .map((coin: any) => coinToString(coin, tokens))
    .join(" / ");
};

const useFeeToString = (fee: StdFee) => {
  const { tokens } = useTerraswap();

  return useMemo(() => {
    if (fee == null || !tokens) {
      return null;
    }

    // @ts-expect-error
    return coinsToString(fee.amount, tokens);
  }, [fee, tokens]);
};

export default useFeeToString;
