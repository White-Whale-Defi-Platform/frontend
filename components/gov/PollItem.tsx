import React, { FC } from "react";
import { Box, Heading, HStack, Text, chakra } from "@chakra-ui/react";
import Link from "next/link";
import dayjs from "dayjs";

import { truncate } from "libs/text";
import { percent } from "libs/num";
import Card from "components/Card";
import PollBadge from "components/gov/PollBadge";
import { parseVotes } from "components/gov/PollVote";
import PollProgress from "components/gov/PollProgress";
import CalendarIcon from "components/icons/CalendarIcon";

type Props = {
  poll: any;
};

const PollItem: FC<Props> = ({ poll }) => {
  const { id, title, creator, end_time, status, progress = 0.05 } = poll;
  const formattedEndTime = dayjs.unix(end_time).format("LLL z");
  const parsed = parseVotes(poll);

  return (
    <Link href={`/gov/poll/${id}`} passHref>
      <chakra.a
        transition="0.2s all"
        display="block"
        borderRadius="2xl"
        overflow="hidden"
        border="2px solid transparent"
        _hover={{ borderColor: "brand.600" }}
      >
        <Card noPadding>
          <Box p="6">
            <HStack justify="space-between">
              <Box maxWidth="75%">
                <Heading size="md" isTruncated>
                  {title}
                </Heading>
                <Text variant="light">Submitted by {truncate(creator)}</Text>
              </Box>
              <Box>
                <PollBadge status={status} />
              </Box>
            </HStack>
          </Box>
          <Box p="6" borderTop="1px" borderTopColor="brand.800">
            <HStack spacing="6">
              <Text variant="light">ID {id}</Text>
              <HStack spacing="2" justify="space-between">
                <Text variant="light" lineHeight="1">
                  Ends In
                </Text>
                <CalendarIcon />
                <Text variant="light" lineHeight="1">
                  {formattedEndTime}
                </Text>
              </HStack>
            </HStack>
          </Box>
          <Box p="6" color="white" borderTop="1px" borderTopColor="brand.800">
            <Box mb="4">
              <Text>
                <Text as="span" variant="light">
                  Quorum
                </Text>
                <Text as="span" ml="2">
                  {percent("0.05")}
                </Text>
              </Text>
            </Box>
            <PollProgress voted={parsed.voted} status={status} />
          </Box>
        </Card>
      </chakra.a>
    </Link>
  );
};

export default PollItem;
