import React, { FC } from "react";
import { Text, HStack, Box, Flex, Image } from "@chakra-ui/react";

import BondModal from "components/bond/BondModal";

const LunaBond: FC = () => {
  return (
    <Flex justify="space-between">
      <HStack py="2">
        <Box
          border="2px solid rgba(255, 255, 255, 0.1);"
          borderRadius="full"
          p="2.5"
        >
          <Image src="/terraCrypto.png" alt="ust" boxSize="1.5rem" />
        </Box>
        <Box px={20} alignSelf="center">
          <Text variant="brand.500">Luna</Text>
        </Box>
      </HStack>
      <Box pl={20} alignSelf="center">
        <Text variant="brand.500">$0.94</Text>
      </Box>
      <Box pl={8} alignSelf="center">
        <Text variant="brand.500">6%</Text>
      </Box>
      <Box alignSelf="center">
        <Text variant="brand.500">$13,341,324</Text>
      </Box>
      <Box alignSelf="center">
        <BondModal tokenContract="uluna" />
      </Box>
    </Flex>
  );
};

export default LunaBond;
