import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { fromTerraAmount } from "@arthuryeti/terra";
import { Box, Flex, HStack, Text, Image, Tooltip as ChakraToolTip, Tag } from "@chakra-ui/react";

import { useTreasury } from "hooks/useTreasury";

import SimpleStat from "components/SimpleStat";
import AssetLine from "components/myPage/AssetLine";
import Card from "components/Card";
import { number } from "libs/math";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: "75%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const Treasury = () => {
  const treasury = useTreasury();

  const data = useMemo(() => {
    return treasury.assets.map((asset) => {
      return {
        color: asset.color,
        label: asset.asset,
        value: fromTerraAmount(asset.value),
        valueForChart: number(asset.value),
        asset: "UST",
      };
    });
  }, [treasury]);

  const formattedData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.valueForChart),
        backgroundColor: data.map((d) => d.color),
        borderWidth: 0,
      },
    ],
  };

  const riskFreeValue = number(treasury.totalValue) - data.filter(d => d.label === 'WHALE' || d.label === 'WHALE-UST LP')
                        .map( token => token.label === 'WHALE-UST LP' ? token.valueForChart / 2 : token.valueForChart )
                        .reduce((a, b) => a + b, 0)

  return (
    <Card noPadding h="full">
      <Flex direction="column" h="full">
        <Flex
          justify="space-between"
          align={{ lg: "center" }}
          pt="8"
          px="8"
          direction={{ base: "column", lg: "row" }}
        >
          <HStack spacing="4" mb={{ base: "4", lg: "0" }}>
            <Image src="/warChest.png" alt="War Chest" boxSize="2.25rem" />
            <Text color="#fff" fontSize="2xl" fontWeight="700">
              Treasury
            </Text>
          </HStack>
          <SimpleStat
            value={fromTerraAmount(treasury.totalValue)}
            asset="UST"
            fontSizeValue="2xl"
            fontSizeAsset="xl"
          />
        </Flex>
        <Flex
          justify="space-between"
          align={{ lg: "center" }}
          pt="8"
          px="8"
          direction={{ base: "column", lg: "row" }}
        >
          <HStack spacing="4" mb={{ base: "4", lg: "0" }}>
            <Image src="/backingValue.png" alt="War Chest" boxSize="2.25rem" />
          <ChakraToolTip label="aUST + UST + LUNA + WHALE-UST LP / 2">
            <Text color="#fff" fontSize="2xl" fontWeight="700">
              Backing Value
            </Text>
          </ChakraToolTip>
          </HStack>
            <SimpleStat
              value={fromTerraAmount(riskFreeValue)}
              asset="UST"
              fontSizeValue="2xl"
              fontSizeAsset="xl"
              />
        </Flex>

        <Flex
          direction={["column", null, "row"]}
          align="center"
          py="12"
          px="8"
          mt="8"
        >
          
          <Box w={[null, null, "50%"]}>
            <Doughnut data={formattedData} options={options} />
          </Box>
          <Flex
            ml={[null, null, "16"]}
            mt={["4", null, "0"]}
            flexWrap="wrap"
            gridGap="8"
          >
            {data.map((item) => (
              <AssetLine key={item.label} data={item} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Treasury;
