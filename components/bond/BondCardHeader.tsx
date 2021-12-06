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
    <Flex mb="2">
      <Box flex="1">
        <Text variant="light">Bond</Text>
      </Box>
      <Box flex="1">
        <Text variant="light">Price</Text>
      </Box>
      <Box flex="1">
        <Text variant="light">ROI</Text>
      </Box>
      <Box flex="1">
        <Text variant="light">Purchased</Text>
      </Box>
      <Box flex="1" />
    </Flex>
  );
};

export default BondCardHeader;
