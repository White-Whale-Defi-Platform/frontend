import { useMemo } from "react";

import { useGovStaker } from "modules/govern";

export const useVoteAvailable = (poll: any): null | any => {
  const govStaker = useGovStaker();

  return useMemo(() => {
    if (poll == null || govStaker == null) {
      return null;
    }

    const dateInSecond = Math.floor(Date.now() / 1000);

    const { id, status, end_time } = poll.data;

    const vote = govStaker.locked_balance.find((bal) => {
      return bal[0] == id;
    });

    return status == "in_progress" && vote == null;
    // return status == "in_progress" && vote == null && end_time > dateInSecond;
  }, [poll, govStaker]);
};

export default useVoteAvailable;
