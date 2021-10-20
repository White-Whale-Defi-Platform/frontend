import React, { FC } from "react";
import {
  HStack,
  Grid,
  GridItem,
  Box,
  Heading,
  Divider,
} from "@chakra-ui/react";

import { usePoll } from "modules/govern";

import BackButton from "components/BackButton";
import PollVote from "components/gov/PollVote";
import PollDetails from "components/gov/PollDetails";
import PollSummary from "components/gov/PollSummary";
import PollVoteLog from "components/gov/PollVoteLog";

type Props = {
  pollId: number;
};

const Poll: FC<Props> = ({ pollId }) => {
  const poll = usePoll(pollId);

  if (poll == null) {
    return null;
  }

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <BackButton />
      <HStack spacing="4" mb="10">
        <Heading color="#fff" size="lg">
          Poll #{pollId}
        </Heading>
      </HStack>
      <Box mb="6">
        <PollSummary poll={poll.data} />
      </Box>
      <Box mb="6">
        <PollVote poll={poll} />
      </Box>
      <Box>
        <PollVoteLog voters={poll.voters} />
      </Box>
    </Box>
  );
};

export default Poll;
