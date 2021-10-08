import React, { FC } from "react";
import { Box, Text, Flex, HStack } from "@chakra-ui/react";

import ThumbsDownIcon from "components/icons/ThumbsDownIcon";
import ThumbsUpIcon from "components/icons/ThumbsUpIcon";
import { VoteType } from "types/poll";

type Props = {
  vote: any;
};

const PollVoteLogItem: FC<Props> = ({ vote }) => {
  const { address, voteType } = vote;
  let iconContent = <ThumbsDownIcon width="1rem" height="1rem" />;

  if (voteType === VoteType.Yes) {
    iconContent = <ThumbsUpIcon width="1rem" height="1rem" />;
  }

  return (
    <Flex justify="space-between" align="center">
      <Box>
        <Text variant="light">{address}</Text>
      </Box>
      <Box>
        <HStack>
          <Text variant="light" lineHeight="1">
            {VoteType[voteType]}
          </Text>
          {iconContent}
        </HStack>
      </Box>
    </Flex>
  );
};

export default PollVoteLogItem;
