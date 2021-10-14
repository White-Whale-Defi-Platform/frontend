import React, { FC } from "react";
import {
  HStack,
  Grid,
  GridItem,
  Box,
  Heading,
  Divider,
} from "@chakra-ui/react";

import BackButton from "components/BackButton";
import PollVote from "components/gov/PollVote";
import { usePoll } from "modules/govern";
import PollDetails from "components/gov/PollDetails";
import PollSummary from "components/gov/PollSummary";
import PollVoteLog from "components/gov/PollVoteLog";

type Props = {
  pollId: number;
};

const Poll: FC<Props> = ({ pollId }) => {
  const { data, isLoading } = usePoll(pollId);

  if (isLoading || !data) {
    return null;
  }

  return (
    <Box>
      <HStack spacing="4" mb="10">
        <BackButton />
        <Box h="8">
          <Divider orientation="vertical" borderColor="brand.800" />
        </Box>
        <Heading color="#fff" size="lg">
          Proposal Details
        </Heading>
      </HStack>
      <Box>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={8}>
            <Box mb="6">
              <PollSummary poll={data} />
            </Box>
            <Box mb="6">
              <PollVote poll={data} />
            </Box>
            <Box>
              <PollVoteLog />
            </Box>
          </GridItem>
          <GridItem colSpan={4}>
            <PollDetails poll={data} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Poll;
