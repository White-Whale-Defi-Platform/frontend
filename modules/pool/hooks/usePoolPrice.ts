import { useMemo } from "react";

import { getAmountsInPool } from "libs/terra";
import { toAmount } from "libs/parse";
import { useGetPool } from "modules/pool";

export const usePoolPrice: any = (pairContract: string) => {
  const { data: pool } = useGetPool(pairContract);

  return useMemo(() => {
    if (pool == null) {
      return;
    }

    const { uusd, other } = getAmountsInPool(pool);

    const price = Number(uusd) / Number(other);

    return toAmount(String(price));
  }, [pool]);
};

export default usePoolPrice;
