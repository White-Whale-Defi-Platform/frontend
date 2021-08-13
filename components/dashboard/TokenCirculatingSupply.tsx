import React, { FC } from "react";
import { Box, HStack, Flex, Center, Divider } from "@chakra-ui/react";

import Card from "components/Card";
import Stat from "components/Stat";

type Props = {};

const TokenCirculatingSupply: FC<Props> = () => {
  return (
    <Card>
      <HStack justify="space-between">
        <Stat label="WHALE" value="1.001" asset="UST" />
        <Center h="50px">
          <Divider
            orientation="vertical"
            borderColor="rgba(255, 255, 255, 0.1)"
          />
        </Center>
        <Stat label="Market Cap" value="164,180,812" asset="UST" />
      </HStack>
      <Box py="8">
        <Divider borderColor="rgba(255, 255, 255, 0.1)" />
      </Box>
      <Stat label="Circulating Supply" value="91,180,812" asset="WHALE" />
      <Box py="8">
        <Divider borderColor="rgba(255, 255, 255, 0.1)" />
      </Box>
      <Stat label="Total Supply" value="91,180,812" asset="WHALE" />
    </Card>
  );
};

export default TokenCirculatingSupply;
