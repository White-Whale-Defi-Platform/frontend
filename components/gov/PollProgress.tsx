import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import { percent, percentage } from "libs/num";

import { Poll, PollStatus } from "types/poll";

type Props = {
  voted: string;
  status: PollStatus;
};

const PollProgress: FC<Props> = ({ voted, status }) => {
  const getColor = () => {
    if (status === PollStatus.Passed) {
      return "green";
    }
    if (status === PollStatus.Rejected) {
      return "red";
    }
    return "white";
  };

  return (
    <Box height="4" bg="brand.600" borderRadius="full" overflow="hidden">
      <Box width={percent(voted)} bg={`${getColor()}.500`} height="full" />
    </Box>
  );
};

export default PollProgress;
