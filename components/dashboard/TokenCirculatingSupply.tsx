import React, { FC } from "react";
import { Box, HStack, Center, Divider } from "@chakra-ui/react";

import Card from "components/Card";
import Stat from "components/Stat";
import { useDashboard } from "hooks/useDashboard";
import { format } from "libs/parse";

type Props = {};

const TokenCirculatingSupply: FC<Props> = () => {
  const { price, totalSupply, circulatingSupply, marketCap } = useDashboard();

  return (
    <Card>
      <HStack justify="space-between">
        <Stat label="WHALE" value={format(price, "uusd")} asset="UST" />
        <Center h="50px">
          <Divider
            orientation="vertical"
            borderColor="rgba(255, 255, 255, 0.1)"
          />
        </Center>
        <Stat
          label="Market Cap"
          value={format(marketCap, "uusd")}
          asset="UST"
        />
      </HStack>
      <Box py="8">
        <Divider borderColor="rgba(255, 255, 255, 0.1)" />
      </Box>
      <Stat
        label="Circulating Supply"
        value={format(circulatingSupply, "uusd")}
        asset="WHALE"
      />
      <Box py="8">
        <Divider borderColor="rgba(255, 255, 255, 0.1)" />
      </Box>
      <Stat
        label="Total Supply"
        value={format(totalSupply, "uusd")}
        asset="WHALE"
      />
    </Card>
  );
};

export default TokenCirculatingSupply;
