import React, { FC } from "react";
import { Badge } from "@chakra-ui/react";

import { PollStatus } from "types/poll";

type Props = {
  status: string;
};

const PollBadge: FC<Props> = ({ status }) => {
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
    <Badge variant="brand" colorScheme={getColor()} textTransform="capitalize" width="100%" >
      {status.replace("_", " ")}
    </Badge>
  );
};

export default PollBadge;
