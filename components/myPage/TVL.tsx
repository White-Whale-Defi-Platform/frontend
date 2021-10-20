import { NextPage } from "next";

import { useTVL } from "hooks/useTVL";
import { Box, Flex, Text, HStack, Circle } from "@chakra-ui/react";

import Card from "components/Card";
import LineChart from "components/LineChart";
import { fromTerraAmount } from "@arthuryeti/terra";

const TVL: NextPage = () => {
  const { total, totalInVault, totalInWarchest } = useTVL();

  const data = [
    {
      label: "Arb Vault",
      value: totalInVault,
      color: "#3CCD64",
    },
    {
      label: "War chest",
      value: totalInWarchest,
      color: "#194325",
    },
  ];

  return (
    <Card h="full">
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="xl" mb="4" fontWeight="bold">
            Total Value Locked
          </Text>
          <Text color="brand.500" fontSize="2xl" fontWeight="bold">
            {fromTerraAmount(total, "0,0")} UST
          </Text>
        </Box>
        <HStack spacing="6">
          {data.map((item) => {
            return (
              <Box key={item.label}>
                <HStack spacing="2">
                  <Circle size="18" bgColor={item.color} />
                  <Text whiteSpace="nowrap">{item.label}</Text>
                </HStack>
                <Text color="#8b8b8c" fontWeight="700">
                  {fromTerraAmount(item.value, "0,0")} UST
                </Text>
              </Box>
            );
          })}
        </HStack>
      </Flex>
      <Box height="225" mt="12">
        <LineChart data={data} />
      </Box>
    </Card>
  );
};

export default TVL;
