import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Flex, HStack, Text, Image } from "@chakra-ui/react";
import { NextPage } from "next";

import { useWarchest } from "hooks/useWarchest";
import { formatAmount } from "libs/terra";

import SimpleStat from "components/SimpleStat";
import AssetLine from "components/myPage/AssetLine";
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

const Gov: NextPage = () => {
  const warchest = useWarchest();

  const data = useMemo(() => {
    return [
      {
        color: "#FFDD4D",
        label: "LUNA",
        value: formatAmount(warchest.lunaAmount),
        valueForChart: number(warchest.lunaAmount),
        asset: "UST",
      },
      {
        color: "#3CCD64",
        label: "WHALE",
        value: formatAmount(warchest.whaleAmount),
        valueForChart: number(warchest.whaleAmount),
        asset: "UST",
      },
      {
        color: "#2E78E9",
        label: "UST",
        value: formatAmount(warchest.ustAmount),
        valueForChart: number(warchest.ustAmount),
        asset: "UST",
      },
      {
        color: "#525252",
        label: "Others",
        value: "0.00",
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
    <>
      <Flex justify="space-between" align="center" mb="6">
        <HStack spacing="4">
          <Image src="/warChest.png" alt="War Chest" boxSize="2.25rem" />
          <Text color="#fff" fontSize="xl" fontWeight="700">
            War Chest
          </Text>
        </HStack>
        <SimpleStat
          value={formatAmount(warchest.totalInUst)}
          asset="UST"
          fontSizeValue="2xl"
          fontSizeAsset="xl"
        />
      </Flex>

      <Flex align="center">
        <Box flex="1" pr="8">
          {data.map((item) => (
            <AssetLine key={item.label} data={item} />
          ))}
        </Box>

        <Box w="35%">
          <Doughnut data={formattedData} options={options} />
        </Box>
      </Flex>
    </>
  );
};

export default Gov;
