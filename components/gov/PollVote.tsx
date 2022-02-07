import React, { FC } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import dayjs from "dayjs";

import { formatRate } from "libs/parse";
import { useVoteAvailable } from "modules/govern";

import Card from "components/Card";
import PollEndDate from "components/gov/PollEndDate";
import PollProgress from "components/gov/PollProgress";
import VoteModal from "components/gov/VoteModal";
import StatWithIcon from "components/StatWithIcon";
import ThumbsUpIcon from "components/icons/ThumbsUpIcon";
import ThumbsDownIcon from "components/icons/ThumbsDownIcon";

type Props = {
  poll: any;
};

const PollVote: FC<Props> = ({ poll }) => {
  const {
    data: { id, status },
  } = poll;
  const isVoteAvailable = useVoteAvailable(poll);
  const yesPercent = (poll.vote.yes / poll.vote.total);
  const noPercent = (poll.vote.no / poll.vote.total);

  return (
    <Card noPadding>
      <Box p="6">
        <PollProgress
          vote={poll?.vote}
          baseline={poll?.baseline}
          status={status}
          showLabel
        />
        <Box mt="10" mb="2">
          <HStack justify="space-between">
            <PollEndDate poll={poll} />
            <VoteModal pollId={id} isDisabled={!isVoteAvailable} />
          </HStack>
        </Box>
      </Box>
      <Box p="6" py="8" borderTop="1px" borderTopColor="brand.800">
        <HStack justify="space-between">
          <Box>
            <Text variant="light">Total</Text>
            <Text fontSize="sm">{fromTerraAmount(poll.vote.total)} WHALE</Text>
          </Box>
          <HStack spacing="6">
            <StatWithIcon
              icon={<ThumbsUpIcon />}
              value={`${formatRate(yesPercent)}%`}
              label={`${fromTerraAmount(poll.vote.yes)} WHALE`}
            />
            <StatWithIcon
              icon={<ThumbsDownIcon />}
              color="red.500"
              bgColor="rgba(237, 116, 112, 0.4)"
              value={`${formatRate(noPercent)}%`}
              label={`${fromTerraAmount(poll.vote.no)} WHALE`}
            />
          </HStack>
        </HStack>
      </Box>
    </Card>
  );
};

export default PollVote;
