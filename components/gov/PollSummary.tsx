import React, { FC } from "react";
import { HStack, Box, Heading, Text } from "@chakra-ui/react";

import Card from "components/Card";
import PollBadge from "components/gov/PollBadge";
import ExternalLink from "components/ExternalLink";

import { truncate } from "libs/text";
import { Poll } from "types/poll";
import useFinder from "hooks/useFinder";

type Props = {
  poll: Poll;
};

const PollSummary: FC<Props> = ({ poll }) => {
  const finder = useFinder();
  const { title, creator, status, description } = poll;

  return (
    <Card noPadding>
      <Box p="6">
        <HStack justify="space-between">
          <Box maxWidth="80%">
            <Heading size="md" isTruncated mb="2">
              Proposal: {title}
            </Heading>
            <Box fontSize="sm">
              <Text as="span" variant="light">
                Submitted by
              </Text>{" "}
              <ExternalLink label={truncate(creator)} href={finder(creator)} />
            </Box>
          </Box>
          <Box>
            <PollBadge status={status} />
          </Box>
        </HStack>
      </Box>
      <Box p="6" borderTop="1px" borderTopColor="brand.800">
        <Text
          dangerouslySetInnerHTML={{ __html: description }}
          variant="light"
        />
      </Box>
    </Card>
  );
};

export default PollSummary;
