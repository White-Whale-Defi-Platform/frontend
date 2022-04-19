import React, { FC } from "react";
import { HStack, Box, Heading, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";

import { usePoll, useVoteAvailable } from "modules/govern";

import PollVote from "components/gov/PollVote";
import PollSummary from "components/gov/PollSummary";
import PollVoteLog from "components/gov/PollVoteLog";
import VoteModal from "components/gov/VoteModal";

type Props = {
  pollId: number;
};

const Poll: FC<Props> = ({ pollId }) => {
  const poll = usePoll(pollId);
  const isVoteAvailable = useVoteAvailable(poll);

  if (poll == null) {
    return null;
  }

  return (
    <Box mt="16" mx="auto" maxW="container.xl" >
      <Box color="brand.500" mb="8">
        <Link href="/gov">
          <a>
            <ArrowBackIcon boxSize={4} />
            Back to Governance
          </a>
        </Link>
      </Box>
      <HStack justify="space-between" spacing="4" mb="10">
        <Heading color="#fff" size="lg">
          Poll #{pollId}
        </Heading>
        <HStack>
          {/* <Box
            as="button"
            mr="17px"
            borderRadius="full"
            color="white"
            border="1px solid #fff"
            alignSelf="center"
            padding="2px 20px"
          >
            <Text fontSize="sm">Execute message</Text>
          </Box> */}
          <VoteModal pollId={pollId} isDisabled={!isVoteAvailable} />
        </HStack>
      </HStack>
      <Box mb="6">
        <PollSummary pollId={pollId} poll={poll} />
      </Box>
      <Box mb="10">
        <PollVote poll={poll} />
      </Box>
      <Box>
        <Heading mb="10" color="#fff" size="lg">
          Voters
        </Heading>
        <PollVoteLog voters={poll.voters} />
      </Box>
    </Box>
  );
};

export default Poll;
