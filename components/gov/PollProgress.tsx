import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import { percent, percentage } from "libs/num";

import { PollStatus } from "types/poll";
import { Vote } from "@terra-money/terra.js";

type Props = {
  vote: any;
  baseline: any;
  status: PollStatus;
  showLabel?: boolean;
};

const PollProgress: FC<Props> = ({ vote, baseline, showLabel = false }) => {
  const yesWidth = vote?.yes / vote?.total;
  const noWidth = vote?.no / vote?.total;
  const thresholdWidth = (vote?.yes + vote?.no) / vote?.threshold;
  const baselineLeft = baseline?.value / vote?.total;

  return (
    <Box position="relative" mt={showLabel ? "9" : "0"}>
      {showLabel && (
        <Box
          position="absolute"
          transform="translateX(-50%)"
          left={percent(String(baselineLeft))}
          top="-10"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text variant="light">{baseline?.label}</Text>
          <Box h="2" w="1px" bg="#515262" mt="1" />
        </Box>
      )}
      <Box
        height="2"
        bg="brand.900"
        borderRadius="full"
        overflow="hidden"
        width="full"
        display="flex"
      >
        <Box width={percent(String(yesWidth))} bg="brand.500" height="full" />
        <Box width={percent(String(noWidth))} bg="red.500" height="full" />
      </Box>
    </Box>
  );
};

export default PollProgress;
