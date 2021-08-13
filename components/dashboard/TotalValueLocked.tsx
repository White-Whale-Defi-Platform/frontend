import React, { FC } from "react";
import { Box, HStack, Flex, Text } from "@chakra-ui/react";

import Card from "components/Card";
import BarChart from "components/BarChart";
import BarChartStat from "components/BarChartStat";

const data = [
  {
    label: "WHALE",
    color: "#3CCD64",
    value: 0.1,
    valueCount: "87M",
  },
  {
    label: "UST",
    color: "#3CA058",
    value: 0.2,
    valueCount: "35M",
  },
  {
    label: "LUNA",
    color: "#476F52",
    value: 0.3,
    valueCount: "13M",
  },
  {
    label: "Others",
    color: "#344238",
    value: 0.4,
    valueCount: "61M",
  },
];

type Props = {};

const TotalValueLocked: FC<Props> = () => {
  return (
    <Card>
      <Text fontSize="lg">Total value locked</Text>
      <Flex align="flex-end">
        <HStack align="baseline" mr="24">
          <Text
            color="brand.500"
            fontWeight="700"
            fontSize="3xl"
            lineHeight="1"
          >
            1.79B
          </Text>
          <Text color="brand.500" fontWeight="700" lineHeight="1">
            UST
          </Text>
        </HStack>
        <Flex direction="column" align="flex-end" flex="1">
          <HStack spacing="10" mb="6">
            {data.map((item) => {
              return (
                <BarChartStat
                  key={item.label}
                  icon={<Box w="4" h="4" borderRadius="full" bg={item.color} />}
                  value={item.valueCount}
                  label={item.label}
                  asset="UST"
                />
              );
            })}
          </HStack>
          <BarChart data={data} />
        </Flex>
      </Flex>
    </Card>
  );
};

export default TotalValueLocked;
