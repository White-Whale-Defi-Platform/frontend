import React from "react";
import {
  Stack,
  HStack,
  Box,
  Text,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const BondCardHeader = () => {
  return (
    <Flex justify="space-between" mb="2">
      <Box px="32">
        <Text variant="light">Bond</Text>
      </Box>
      <Box>
        <Text variant="light">Price</Text>
      </Box>
      <Box>
        <Text variant="light">ROI</Text>
      </Box>
      <Box pr="52">
        <Text variant="light">Purchased</Text>
      </Box>
    </Flex>
  );
};

export default BondCardHeader;
