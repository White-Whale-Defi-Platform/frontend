import React, { FC } from "react";
import { Box, HStack, Flex, Text } from "@chakra-ui/react";

import Card from "components/Card";
import BarChart from "components/BarChart";
import BarChartStat from "components/BarChartStat";

const data = [
  {
    label: "UST",
    color: "#2E78E9",
    value: 0.6,
    valueCount: "--",
  },
  {
    label: "WHALE",
    color: "#3CCD64",
    value: 0.4,
    valueCount: "--",
  },
];

type Props = {};

const CommunityFund: FC<Props> = () => {
  return (
    <Card mt="12">
      <Flex align="center" justify="space-between" mb="4">
        <Text fontSize="xl" fontWeight="bold">
          Community Fund
        </Text>
        <HStack spacing="10">
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
      </Flex>
      <Flex align="flex-end">
        <HStack align="baseline" flex="0.3">
          <Text
            color="brand.500"
            fontWeight="700"
            fontSize="3xl"
            lineHeight="1"
          >
            $--
          </Text>
        </HStack>
        <Box flex="1">
          <BarChart data={data} />
        </Box>
      </Flex>
    </Card>
  );
};

export default CommunityFund;
