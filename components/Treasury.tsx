import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { fromTerraAmount } from "@arthuryeti/terra";
import {
  Box,
  Flex,
  HStack,
  Text,
  Image,
  Center,
  Divider,
} from "@chakra-ui/react";

import { useWarchest } from "hooks/useWarchest";
import { useGovStaked } from "modules/govern";

import UnstakeModal from "components/gov/UnstakeModal";
import StakeModal from "components/gov/StakeModal";
import SimpleStat from "components/SimpleStat";
import AssetLine from "components/myPage/AssetLine";
import Card from "components/Card";
import { number } from "libs/math";
import useTreasury from "hooks/useTreasury";

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

const Warchest = () => {
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

  return (
    <Card noPadding h="full">
      <Flex direction="column" h="full">
        <Flex justify="space-between" align="center" pt="8" px="8">
          <HStack spacing="4">
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

export default Warchest;
