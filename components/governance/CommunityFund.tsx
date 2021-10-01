import React, { FC, useMemo } from "react";
import { Box, HStack, Flex, Text } from "@chakra-ui/react";

import { useCommunityFund } from "hooks/useCommunityFund";
import { formatAmount } from "libs/terra";
import { number } from "libs/math";

import Card from "components/Card";
import BarChart from "components/BarChart";
import BarChartStat from "components/BarChartStat";

const CommunityFund: FC = () => {
  const communityFund = useCommunityFund();

  const ustAmountInNumber = number(communityFund.ustAmount) / 1000000;
  const whaleAmountInNumber = number(communityFund.whaleAmount) / 1000000;
  const totalInUstAmountInNumber = number(communityFund.totalInUst) / 1000000;

  const data = useMemo(() => {
    return [
      {
        label: "UST",
        color: "#2E78E9",
        value: ustAmountInNumber / totalInUstAmountInNumber,
        valueCount: formatAmount(communityFund.ustAmount),
      },
      {
        label: "WHALE",
        color: "#3CCD64",
        value: whaleAmountInNumber / totalInUstAmountInNumber,
        valueCount: formatAmount(communityFund.whaleAmount),
      },
    ];
  }, [
    communityFund,
    whaleAmountInNumber,
    ustAmountInNumber,
    totalInUstAmountInNumber,
  ]);

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
            {formatAmount(communityFund.totalInUst)} UST
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
