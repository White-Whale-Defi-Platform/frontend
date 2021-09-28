import { get, has } from "lodash";

import { Pool } from "types/common";

export const isAssetNative = (info) => {
  return has(info, "native_token");
};

export const getAssetDenom = (info) => {
  if (isAssetNative(info)) {
    return get(info, "native_token.denom");
  }

  return get(info, "token.contract_addr");
};

export const getAmountsInPool = (pool: Pool) => {
  return pool.assets.reduce(
    (prev, a) => {
      const key = getAssetDenom(a.info) === "uusd" ? "uusd" : "other";

      return {
        ...prev,
        [key]: a.amount,
      };
    },
    { uusd: "0", other: "0" }
  );
};
