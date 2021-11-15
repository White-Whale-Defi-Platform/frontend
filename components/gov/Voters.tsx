import React from "react";
import { Box, Text, Flex, HStack, Divider } from "@chakra-ui/react";
const Voters = () => {
  return (
    <React.Fragment>
      <HStack>
        <Box flex="1">
          <Flex justify="space-between">
            <Text color="brand.500" fontWeight="600" mb="2" fontSize="xs">
              terra1...ldwf97
            </Text>
            <Text fontSize="xs" variant="brand" mb="2">
              Yes
            </Text>
            <Text fontSize="xs" variant="brand" mb="2">
              15152 WHALE
            </Text>
          </Flex>
        </Box>
      </HStack>
      <Divider borderColor="rgba(255, 255, 255, 0.1)" my="2" />
    </React.Fragment>
  );
};

export default Voters;
