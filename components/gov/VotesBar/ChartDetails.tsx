import React, { FC } from "react";
import { Box, Text, Flex, HStack } from "@chakra-ui/react";
import CircleIcon from "./CircleIcon";
import VotesChartBar from "./VotesChartBar";
import { Poll } from "types/poll";
import { usePoll, useVoteAvailable } from "modules/govern";


type Props = {
  pollId: number
};

const ChartDetailsBar: FC<Props> = ({ pollId }) => {
  const full_poll = usePoll(pollId);

  return (
    <HStack width="full">
      <Box mb="2" mr="2" flex="1" fontSize="sm">
        <Flex mb="4" justify="space-between">
          <Text as="span" variant="brand" fontSize="xs">
            Votes details
          </Text>
          <HStack>
            <HStack>
              <Text fontSize="xx-small" variant="brand">
                Voted
              </Text>
              <Text fontSize="xx-small" fontWeight="600" color="brand.500">
              {(((full_poll.vote.yes + full_poll.vote.no) / full_poll.vote.total) * 100).toFixed(2)}%
              </Text>
            </HStack>
            <CircleIcon boxSize="8px" color="brand.500" />
            <Text fontSize="xx-small" variant="brand">
              Yes
            </Text>
            <Text fontSize="xx-small" variant="light">
             {((full_poll.vote.yes / full_poll.vote.total) * 100).toFixed(2)}%
            </Text>
            <CircleIcon boxSize="8px" color="red.500" />
            <Text fontSize="xx-small" variant="brand">
              No
            </Text>
            <Text fontSize="xx-small" variant="light">
            {((full_poll.vote.no / full_poll.vote.total) * 100).toFixed(2)}%
            </Text>
           
          </HStack>
        </Flex>
        <VotesChartBar />
      </Box>
    </HStack>
  );
};

export default ChartDetailsBar;
