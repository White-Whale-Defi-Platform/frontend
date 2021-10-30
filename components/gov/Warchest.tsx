import React, { useMemo } from "react";
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
  const warchest = useWarchest();
  const stakedAmount = useGovStaked();

  const data = useMemo(() => {
    return [
      {
        color: "#FFDD4D",
        label: "LUNA",
        value: fromTerraAmount(warchest.lunaAmount),
        valueForChart: number(warchest.lunaAmount),
        asset: "UST",
      },
      {
        color: "#3CCD64",
        label: "WHALE",
        value: fromTerraAmount(warchest.whaleAmount),
        valueForChart: number(warchest.whaleAmount),
        asset: "UST",
      },
      {
        color: "#2EB0E9",
        label: "UST",
        value: fromTerraAmount(warchest.ustAmount),
        valueForChart: number(warchest.ustAmount),
        asset: "UST",
      },
      {
        color: "#525252",
        label: "Others",
        value: "0.0",
        valueForChart: 0,
        asset: "UST",
      },
    ];
  }, [warchest]);

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
      <Flex direction="column" justify="space-between" h="full">
        <Flex justify="space-between" align="center" pt="8" px="8">
          <HStack spacing="4">
            <Image src="/warChest.png" alt="War Chest" boxSize="2.25rem" />
            <Text color="#fff" fontSize="2xl" fontWeight="700">
              War Chest
            </Text>
          </HStack>
          <SimpleStat
            value={fromTerraAmount(warchest.totalInUst)}
            asset="UST"
            fontSizeValue="2xl"
            fontSizeAsset="xl"
          />
        </Flex>

        <Flex direction={["column", null, "row"]} align="center" py="12" px="8">
          <Box w={[null, null, "35%"]}>
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

        <HStack bg="blackAlpha.400" px="8" py="2">
          <Box flex="1">
            <Flex justify="space-between">
              <Text>APY</Text>
              <Text color="brand.500" fontWeight="600">
                18.2%
              </Text>
            </Flex>
            <Divider borderColor="rgba(255, 255, 255, 0.1)" my="2" />
            <Flex justify="space-between">
              <Text>My Deposit</Text>
              <Text color="brand.500" fontWeight="600">
                {fromTerraAmount(stakedAmount, "0.00a")} WHALE
              </Text>
            </Flex>
          </Box>
          <Center h="14" px="6">
            <Divider
              orientation="vertical"
              borderColor="rgba(255, 255, 255, 0.1)"
            />
          </Center>
          <HStack flex="1" spacing="4">
            <UnstakeModal />
            <StakeModal />
          </HStack>
        </HStack>
      </Flex>
    </Card>
  );
};

export default Warchest;
