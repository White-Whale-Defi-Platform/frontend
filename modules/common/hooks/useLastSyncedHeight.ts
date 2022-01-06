import { useMemo } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export const useLastSyncedHeight = () => {
  const { client } = useTerraWebapp();

  const { data: blockInfo } = useQuery("blockInfo", () => {
    return client.tendermint.blockInfo();
  });

  return useMemo(() => {
    if (blockInfo == null) {
      return null;
    }

    return +blockInfo.block.header.height;
  }, [blockInfo]);
};

export default useLastSyncedHeight;
