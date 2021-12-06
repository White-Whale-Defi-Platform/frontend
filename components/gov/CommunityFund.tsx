import React, { FC, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { fromTerraAmount } from "@arthuryeti/terra";
import { Box, Flex, HStack, Text, Image } from "@chakra-ui/react";

import { useCommunityFund } from "hooks/useCommunityFund";

import SimpleStat from "components/SimpleStat";
import AssetLine from "components/myPage/AssetLine";
import Card from "components/Card";

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

const CommunityFund: FC = () => {
  const { totalInUst, ustBalance, whaleInUst } = useCommunityFund();

  const data = useMemo(() => {
    return [
      {
        label: "UST",
        asset: "UST",
        color: "#2EB0E9",
        value: +ustBalance,
        valueCount: fromTerraAmount(ustBalance),
      },
      {
        label: "WHALE",
        asset: "UST",
        color: "#3CCD64",
        value: +whaleInUst,
        valueCount: fromTerraAmount(whaleInUst),
      },
    ];
  }, [whaleInUst, ustBalance]);

  const formattedData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
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
            <Image src="/communityFund.png" alt="War Chest" boxSize="2.25rem" />
            <Text color="#fff" fontSize={["xl", null, "2xl"]} fontWeight="700">
              Community Fund
            </Text>
          </HStack>
          <SimpleStat
            value={totalInUst}
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

        <HStack bg="blackAlpha.400" px="8" py="4">
          <Box flex="1">
            <Text>
              WHALE holders can submit proposals to utilize the Community Fund
              for further growth and development of the platform.
            </Text>
          </Box>
          {/* <Box>
            <StakeModal />
          </Box> */}
        </HStack>
      </Flex>
    </Card>
  );
};

export default CommunityFund;
