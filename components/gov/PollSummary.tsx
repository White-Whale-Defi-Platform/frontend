import React, { FC } from "react";
import {
  HStack,
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Link as _Link,
  Center,
} from "@chakra-ui/react";

import Card from "components/Card";
import PollBadge from "components/gov/PollBadge";
import ExternalLink from "components/ExternalLink";

import { truncate } from "libs/text";
import { Poll } from "types/poll";
import useFinder from "hooks/useFinder";
import dayjs from "dayjs";
import ChartDetailsBar from "./VotesBar/ChartDetails";

type Props = {
  poll: {
    data: Poll;
    endsIn: Date;
  };
  pollId: number;
};

const PollSummary: FC<Props> = ({ poll, pollId }) => {
  const finder = useFinder();
  const {
    data: { title, creator, status, description, link },
    endsIn,
  } = poll;
  const formattedDate = dayjs(endsIn).format("LLL");

  return (
    <>
      <Card noPadding mb="6">
        <Flex direction="column" justify="space-between" h="full">
          <Box bg="blackAlpha.400" rounded="2xl" p="4">
            <HStack justify="space-between">
              <Box maxWidth="80%">
                <Heading size="md" isTruncated mb="1">
                  {title}
                </Heading>
              </Box>
              <Box>
                <PollBadge status={status} />
              </Box>
            </HStack>
          </Box>

          <HStack px="4" py="4">
            <Box flex="1" fontSize="sm">
              <Flex justify="space-between">
                <Text as="span" variant="light">
                  Creator
                </Text>{" "}
                <Text fontSize="xs" fontWeight="600">
                  <ExternalLink
                    label={truncate(creator)}
                    href={finder(creator)}
                  />
                </Text>
              </Flex>
              <Divider borderColor="rgba(255, 255, 255, 0.1)" my="2" />
              <Flex justify="space-between">
                <Text as="span" variant="light">
                  End Time
                </Text>{" "}
                <Text fontSize="xs" color="brand.500" fontWeight="600">
                  {formattedDate}
                </Text>
              </Flex>
            </Box>
            {/* <Center h="70px" px="6">
              <Divider
                orientation="vertical"
                borderColor="rgba(255, 255, 255, 0.1)"
              />
            </Center>
            {/* <HStack flex="1" spacing="4">
              <ChartDetailsBar pollId={pollId} />
            </HStack> */} 
          </HStack>
        </Flex>
      </Card>

      <Card noPadding>
        <Box px="4" py="4">
          <Text>Description</Text>
        </Box>
        <Box px="4" pb="4">
          <Text
            dangerouslySetInnerHTML={{ __html: description }}
            variant="light"
          />
        </Box>
        {link && (
          <>
            <Box px="4" pb="2">
              <Text>Link</Text>
            </Box>
            <Box fontSize="xs" fontWeight="600" color="brand.500" px="4" pb="6">
              <_Link href={link}>{link}</_Link>
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

export default PollSummary;
