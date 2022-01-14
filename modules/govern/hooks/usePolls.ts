import { useQuery } from 'react-query';
import { useTerraWebapp } from '@arthuryeti/terra';

import { Poll } from 'types/poll';
import useContracts from 'hooks/useContracts';

type Result = {
  polls: Poll[];
};

export const usePolls = (status?: string) => {
  const { client } = useTerraWebapp();
  const { gov } = useContracts();

  const msg: any = {
    polls: {},
  };

  if (status) {
    msg.polls.filter = status;
  }

  return useQuery<Result>(
    ['polls', status],
    () => client.wasm.contractQuery(gov, msg),
    {}
  );
};

export default usePolls;
