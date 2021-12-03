import React, { FC } from "react";
import { Text, HStack, Box, Flex, Image } from "@chakra-ui/react";

import useContracts from "hooks/useContracts";

import BondModal from "components/bond/BondModal";

const WhaleUstBond: FC = () => {
  const { whaleUstLpToken } = useContracts();

  return (
    <Flex justify="space-between">
      <HStack>
        <HStack spacing="-5">
          <Box
            bg="#252525"
            border="2px solid rgba(255, 255, 255, 0.1);"
            borderRadius="full"
            p="2.5"
            position="relative"
            zIndex="2"
          >
            <Image src="/logo-small.svg" alt="logo-small" boxSize="1.5rem" />
          </Box>
          <Box
            border="2px solid rgba(255, 255, 255, 0.1);"
            borderRadius="full"
            p="2.5"
          >
            <Image src="/ust.png" alt="ust" boxSize="1.5rem" />
          </Box>
        </HStack>
        <Box px={12} alignSelf="center">
          <Text variant="brand.500">WHALE-UST LP</Text>
        </Box>
      </HStack>
      <Box px={8} alignSelf="center">
        <Text variant="brand.500">$0.924</Text>
      </Box>
      <Box alignSelf="center">
        <Text variant="brand.500">7.63%</Text>
      </Box>
      <Box alignSelf="center">
        <Text variant="brand.500">$18,296,029</Text>
      </Box>
      <Box alignSelf="center">
        <BondModal tokenContract={whaleUstLpToken} />
      </Box>
    </Flex>
  );
};

export default WhaleUstBond;
