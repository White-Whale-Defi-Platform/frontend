import React, { FC } from "react";
import { GridItem } from "@chakra-ui/react";

import PollItem from "components/gov/PollItem";
import { usePolls } from "modules/govern";

type Props = {
  status?: string;
};

const PollList: FC<Props> = ({ status }) => {
  const { data, isLoading } = usePolls(status);

  if (isLoading || !data) {
    return null;
  }

  const polls = data.polls;

  return (
    <>
      {polls.map((poll) => {
        return (
          <GridItem key={poll.id} colSpan={6}>
            <PollItem poll={poll} />
          </GridItem>
        );
      })}
    </>
  );
};

export default PollList;
