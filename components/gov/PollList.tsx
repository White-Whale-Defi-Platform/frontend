import React, { FC } from "react";
import { GridItem, Text } from "@chakra-ui/react";

import PollItem from "components/gov/PollItem";
import { usePolls } from "modules/govern";
import Card from "components/Card";

type Props = {
  status?: string;
};

const PollList: FC<Props> = ({ status }) => {
  const { data, isLoading } = usePolls(status);

  if (isLoading || !data) {
    return null;
  }

  const polls = data.polls;

  if (polls.length == 0) {
    return (
      <GridItem colSpan={12}>
        <Card>
          <Text fontSize="xl" color="whiteAlpha.400">
            No polls yet
          </Text>
        </Card>
      </GridItem>
    );
  }

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
