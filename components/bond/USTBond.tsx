import React, { FC } from "react";
import { Text, HStack, Box, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import BondModal from "./BondModal";
import { usePool, usePoolApr } from "modules/pool";

const USTBond: FC = () => {
  return (
    <Flex pt="2" justify="space-between">
      <HStack>
        <Box
          border="2px solid rgba(255, 255, 255, 0.1);"
          borderRadius="full"
          p="2.5"
        >
          <Image src="/ust.png" alt="ust" boxSize="1.5rem" />
        </Box>
        <Box px={20} alignSelf="center">
          <Text>UST</Text>
        </Box>
      </HStack>
      <Box pl={20} alignSelf="center">
        <Text>$0.9199</Text>
      </Box>
      <Box alignSelf="center">
        <Text>8.01%</Text>
      </Box>
      <Box alignSelf="center">
        <Text>$11,200,023</Text>
      </Box>
      <Box alignSelf="center">
        <BondModal tokenContract="uusd" />
      </Box>
    </Flex>
  );
};

export default USTBond;
