import React from "react";
import { Box, Text, Flex, HStack } from "@chakra-ui/react";
import CircleIcon from "./CircleIcon";
import VotesChartBar from "./VotesChartBar";

const ChartDetailsBar = () => {
  return (
    <HStack width="full">
      <Box mb="2" mr="2" flex="1" fontSize="sm">
        <Flex mb="4" justify="space-between">
          <Text as="span" variant="brand" fontSize="xs">
            Votes details
          </Text>
          <HStack>
            <HStack>
              <Text fontSize="xx-small" variant="brand">
                Voted
              </Text>
              <Text fontSize="xx-small" fontWeight="600" color="brand.500">
                23.6%
              </Text>
            </HStack>
            <CircleIcon boxSize="8px" color="brand.500" />
            <Text fontSize="xx-small" variant="brand">
              Yes
            </Text>
            <Text fontSize="xx-small" variant="light">
              17.6%
            </Text>
            <CircleIcon boxSize="8px" color="red.500" />
            <Text fontSize="xx-small" variant="brand">
              No
            </Text>
            <Text fontSize="xx-small" variant="light">
              3.6%
            </Text>
            <CircleIcon boxSize="8px" color="grey" />
            <Text fontSize="xx-small" variant="brand">
              Abstain
            </Text>
            <Text fontSize="xx-small" variant="light">
              3.6%
            </Text>
          </HStack>
        </Flex>
        <VotesChartBar />
      </Box>
    </HStack>
  );
};

export default ChartDetailsBar;
