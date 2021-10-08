import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

import Card from "components/Card";
import ExternalLink from "components/ExternalLink";

import { truncate } from "libs/text";
import { Poll, PollType } from "types/poll";

type Props = {
  poll: Poll;
};

const PollDetails: FC<Props> = ({ poll }) => {
  const { id, end_time } = poll;
  // const formattedSubmittedAt = dayjs(submittedAt).format("LLL z");
  const formattedEndAt = dayjs.unix(end_time).format("LLL z");

  return (
    <Card>
      <Box mb="6">
        <Text variant="light">Proposal ID</Text>
        <Text>{id}</Text>
      </Box>
      {/* <Box mb="6">
        <Text variant="light">Type</Text>
        <Text>{PollType[type]}</Text>
      </Box>
      <Box mb="6">
        <Text variant="light">Amount</Text>
        <pre>{amount}</pre>
      </Box> */}
      {/* <Box mb="6">
        <Text variant="light">Recipient</Text>
        <ExternalLink label={truncate(recipient)} href="https://google.com" />
      </Box> */}
      {/* <Box mb="6">
        <Text variant="light">Submit time</Text>
        <Text>{formattedSubmittedAt}</Text>
      </Box> */}
      <Box>
        <Text variant="light">Ends in</Text>
        <Text>{formattedEndAt}</Text>
      </Box>
    </Card>
  );
};

export default PollDetails;
