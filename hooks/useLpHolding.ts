import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import { usePool } from "modules/pool";

export const useLpHolding = () => {
  const {
    network: { name },
  } = useTerraWebapp();
  const whaleUstPair = contracts[name].whaleUstPair;
  const whaleUstLpToken = contracts[name].whaleUstLpToken;
  const pool = usePool({
    pairContract: whaleUstPair,
    lpTokenContract: whaleUstLpToken,
  });

  return pool.myShareInUST;
};

export default useLpHolding;
