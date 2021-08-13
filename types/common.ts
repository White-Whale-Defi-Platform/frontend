import { AssetToken, NativeToken } from "types/asset";

export enum PriceKey {
  NATIVE = "price",
  PAIR = "pair",
  ORACLE = "oracle",
  PRE = "pre",
  END = "end",
  EXTERNAL = "external",
}

export enum BalanceKey {
  NATIVE = "balance",
  TOKEN = "token",
  EXTERNAL = "external",
}

export enum StakingKey {
  LPSTAKABLE = "lpStakable",
  LPSTAKED = "lpStaked",
  SLPSTAKED = "slpStaked",
  LPREWARD = "reward",
  SLPREWARD = "slpReward",
}

export enum AssetInfoKey {
  MINCOLLATERALRATIO = "minCollateralRatio",
  MULTIPLIER = "multiplier",
}

export type MantleCoin = {
  amount: string;
  denom: string;
};

export type ContractVariables = {
  contract: string;
  msg: object;
};

export type PairPool = {
  assets: (AssetToken | NativeToken)[];
  total_share: string;
};

export type Dictionary<A = string> = {
  [key: string]: A;
};
