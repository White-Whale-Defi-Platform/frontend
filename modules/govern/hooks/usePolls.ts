import { useQuery } from "react-query";

import { useTerraWebapp } from "@arthuryeti/terra";
import { Poll } from "types/poll";
import contracts from "constants/contracts.json";

type Result = {
  polls: Poll[];
};

export const usePolls = (status?: string) => {
  const {
    client,
    network: { name },
  } = useTerraWebapp();
  const govContract = contracts[name].gov;

  let msg: any = {
    polls: {},
  };

  if (status) {
    msg.polls.filter = status;
  }

  return useQuery<Result>(
    ["polls", status],
    () => {
      return client.wasm.contractQuery(govContract, msg);
    },
    {}
  );
};

export default usePolls;
