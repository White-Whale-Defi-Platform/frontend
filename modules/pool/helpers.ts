import { findAsset, getTokenDenom, trunc } from "@arthuryeti/terra";
import { DECIMALS, ONE_TOKEN } from "constants/constants";

export const calculateShare = (pool: any, token: string, amount: string) => {
  const asset = findAsset(pool.assets, token);

  const share = trunc(
    // @ts-expect-error
    (Number(amount) / Number(asset.amount)) * Number(pool.total_share)
  );

  return String(share);
};

export const calculateWithdrawTotalPrice = (
  totalPrice1: string,
  totalPrice2: string
) => String(trunc(Number(totalPrice1) + Number(totalPrice2), DECIMALS));

export const calculateTokenAmount = (
  pool: any,
  token: string,
  amount: string
) => {
  const { assets } = pool;

  const [{ amount: totalAmount1 }, { amount: totalAmount2 }] = [...assets].sort(
    (a) => (getTokenDenom(a.info) === token ? -1 : 1)
  );

  const result = Number(amount) * (Number(totalAmount2) / Number(totalAmount1));

  return String(result.toFixed(6));
};

export const calculateTokensAmounts = (
  pool: any,
  share: string
): Record<string, string> => {
  return pool.assets.reduce(
    (acc, asset) => ({
      ...acc,
      [getTokenDenom(asset.info)]: Math.floor(
        (Number(asset.amount) / Number(pool.total_share)) * Number(share)
      ),
    }),
    {}
  );
};

export const calculateSharePrice = (
  pool: any,
  amount: string,
  token1Price: string,
  token2Price: string
) => {
  const token1 = getTokenDenom(pool.assets[0].info);
  const token2 = getTokenDenom(pool.assets[1].info);
  const tokensAmounts = calculateTokensAmounts(pool, amount);

  if (
    token1Price == null ||
    token2Price == null ||
    token1 == null ||
    token2 == null ||
    pool == null
  ) {
    return "0";
  }

  if (Number(token1Price) == 0 || Number(token2Price) == 0) {
    return "0";
  }

  const token1TotalPrice = trunc(
    (Number(tokensAmounts[token1]) * Number(token1Price)) / ONE_TOKEN
  );

  const token2TotalPrice = trunc(
    (Number(tokensAmounts[token2]) * Number(token2Price)) / ONE_TOKEN
  );

  return String(token1TotalPrice + token2TotalPrice);
};
