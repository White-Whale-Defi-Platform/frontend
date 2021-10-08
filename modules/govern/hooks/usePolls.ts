import { useQuery } from "react-query";

import { useTerraWebapp } from "@arthuryeti/terra";
import contracts from "constants/contracts.json";

type Result = {
  polls: any[];
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
    "polls",
    () => {
      return client.wasm.contractQuery(govContract, msg);
    },
    {}
  );
};

export default usePolls;
