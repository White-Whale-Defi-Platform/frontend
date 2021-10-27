import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import useContracts from "hooks/useContracts";
import { Poll } from "types/poll";
import {
  useGovWhaleBalance,
  useGovState,
  useGovConfig,
  usePollVoters,
} from "modules/govern";

export const usePoll = (pollId: number): null | any => {
  const { client } = useTerraWebapp();
  const { gov } = useContracts();

  const balance = useGovWhaleBalance();
  const govConfig = useGovConfig();
  const govState = useGovState();
  const voters = usePollVoters(pollId);

  const { data } = useQuery<Poll>(
    ["poll", pollId],
    () => {
      return client.wasm.contractQuery(gov, {
        poll: { poll_id: pollId },
      });
    },
    {
      enabled: !!pollId,
    }
  );

  return useMemo(() => {
    if (
      data == null ||
      govConfig == null ||
      govState == null ||
      voters == null
    ) {
      return null;
    }

    const total: number =
      data.status !== "in_progress" && data.total_balance_at_end_poll
        ? +data.total_balance_at_end_poll
        : data.staked_amount
        ? +data.staked_amount
        : num(balance).minus(govState.total_deposit).toNumber();

    const yes: number = +data.yes_votes;
    const no: number = +data.no_votes;

    const quorum = {
      current: (yes + no) / total,
      gov: +govConfig.quorum,
    };

    const threshold = num(data.yes_votes)
      .plus(data.no_votes)
      .times(govConfig.threshold)
      .toNumber();

    const baseline =
      quorum.current > quorum.gov
        ? {
            value: (threshold / total) * total,
            label: "Pass Threshold",
          }
        : {
            value: quorum.gov * total,
            label: `Quorum ${quorum.gov * 100}%`,
          };

    return {
      data,
      voters,
      baseline,
      quorum,
      vote: {
        yes,
        no,
        total,
        threshold,
      },
    };
  }, [data, govConfig, voters, balance, govState]);
};

export default usePoll;
