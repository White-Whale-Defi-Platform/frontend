import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { fromTerraAmount, num } from "@arthuryeti/terra";
import { Box, Flex, HStack, Stack, Text, Image, Tooltip as ChakraToolTip, Tag } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useTreasury } from "hooks/useTreasury";
import { Grid, GridItem } from "@chakra-ui/react";

import SimpleStat from "components/SimpleStat";
import AssetLine from "components/myPage/AssetLine";
import Card from "components/Card";
import { number } from "libs/math";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
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
  // TODO: This is poopy, move to useTreasury so the calc is easier and just return it from there
  const riskFreeValue = number(treasury.totalValue) - data.filter(d => d.label === 'WHALE' || d.label === 'WHALE-UST LP' || d.label === 'WHALE-vUST LP')
    .map(token => token.label === 'WHALE-UST LP' || token.label === 'WHALE-vUST LP' ? token.valueForChart / 2 : token.valueForChart)
    .reduce((a, b) => a + b, 0)

  const toAmount = (value) => num(value).div(1000000).dp(0).toNumber().toLocaleString()

  return (
    <Card noPadding h="full">
      <Flex direction="column" h="full">

        <Stack 
        direction={['column', 'row']} 
        bg="black" borderRadius="3xl" 
        justifyContent="flex-start" 
        alignItems="baseline"
        padding={4}>
          <Flex
            justify="space-between"
            align={{ lg: "center" }}
            flex={1}
            paddingY={4}
            borderRight={["none", "1px solid"]}
            borderBottom={["1px solid", "none"]}
            borderRightColor={["none", "whiteAlpha.300"]}
            borderBottomColor={["whiteAlpha.300", "none"]}
            flexDirection="column"
            
          >
            <HStack spacing="4" mb={{ base: "4", lg: "0" }} width="100%">
              <Image src="/warChest.png" alt="War Chest" boxSize="2.25rem" />
              <Text color="#fff" fontSize="2xl" fontWeight="700">
                Treasury
              </Text>
            </HStack>
            <SimpleStat
              value={toAmount(treasury.totalValue)}
              asset="UST"
              fontSizeValue="2xl"
              fontSizeAsset="xl"
            />
          </Flex>
          <Flex
            justify="space-between"
            flex={1}
            align={{ lg: "center" }}
            flexDirection="column"
          >
            <HStack spacing="4" mb={{ base: "4", lg: "0" }} width="100%">
              <Image src="/backingValue.png" alt="War Chest" boxSize="2.25rem" />
              <Text color="#fff" fontSize="2xl" fontWeight="700">
                Backing Value
              </Text>
            </HStack>
            <SimpleStat
              value={toAmount(riskFreeValue)}
              asset="UST"
              fontSizeValue="2xl"
              fontSizeAsset="xl"
            />
          </Flex>
        </Stack>

        {/* <Skeleton startColor='brand.500' endColor='orange.500' isLoaded={!treasury.isLoading}> */}

        <Flex
          direction={["column", null, "row"]}
          align="center"
          py="12"
          px="8"
          mt="8"
          gap={8}
          justifyContent="space-evenly"
        >


          <Box width={["100%", "40%"]}>
            <Doughnut data={formattedData} options={options} />
          </Box>
          <Grid
            ml={[null, null, "4"]}
            mt={["4", null, "0"]}
            gridGap="4"
            templateColumns={[ 'repeat(2, 1fr)' ,'repeat(2, 1fr)']}
          >
            {data.map((item) => (
              <GridItem key={item.label} >
                <AssetLine data={item} />
              </GridItem>
            ))}
          </Grid>

        </Flex>
        {/* </Skeleton> */}
      </Flex>
    </Card>
  );
};

export default Treasury;
