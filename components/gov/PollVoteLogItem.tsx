import React, { FC } from "react";
import { Box, Text, Flex, HStack } from "@chakra-ui/react";

import ThumbsDownIcon from "components/icons/ThumbsDownIcon";
import ThumbsUpIcon from "components/icons/ThumbsUpIcon";

type Props = {
  data: {
    voter: string;
    vote: string;
    balance: string;
  };
};

const PollVoteLogItem: FC<Props> = ({ data }) => {
  const { voter, vote } = data;
  let iconContent = <ThumbsDownIcon width="1rem" height="1rem" />;

  if (vote === "yes") {
    iconContent = <ThumbsUpIcon width="1rem" height="1rem" />;
  }

  return (
    <Flex justify="space-between" align="center">
      <Box>
        <Text variant="light">{voter}</Text>
      </Box>
      <Box>
        <HStack>
          <Text variant="light" lineHeight="1" textTransform="capitalize">
            {vote}
          </Text>
          {iconContent}
        </HStack>
      </Box>
    </Flex>
  );
};

export default PollVoteLogItem;
