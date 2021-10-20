import { Doughnut } from "react-chartjs-2";
import { Box, Flex, Text, HStack, Circle } from "@chakra-ui/react";
import { NextPage } from "next";

import Card from "components/Card";
import CardTitle from "components/CardTitle";
import { format } from "libs/parse";

type DataIrtem = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  title: string;
  value: string;
  asset: string;
  data: DataIrtem[];
};

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
};

const PieGraphCard: NextPage<Props> = ({ title, value, asset, data }) => {
  const formattedData = {
    labels: data.map((data) => data.label),
    datasets: [
      {
        data: data.map((data) => data.value),
        backgroundColor: data.map((data) => data.color),
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card h="full">
      <Flex flexDir="column" justify="space-between" h="full">
        <Flex align="baseline" justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
          <HStack align="baseline">
            <Text
              color="brand.500"
              fontWeight="700"
              fontSize="2xl"
              lineHeight="1"
            >
              {value}
            </Text>
            <Text color="brand.500" fontWeight="700" lineHeight="1">
              {asset}
            </Text>
          </HStack>
        </Flex>

        <Flex mt="8" align="center">
          <Box w="55%">
            <Doughnut data={formattedData} options={options} />
          </Box>

          <Flex justify="center" flexDir="column" gridGap="4" pl="12">
            {data.map((item) => {
              return (
                <Box key={item.label}>
                  <HStack spacing="2">
                    <Circle size="18" bgColor={item.color} />
                    <Text whiteSpace="nowrap">{item.label}</Text>
                  </HStack>
                  <Text color="#8b8b8c" fontWeight="700">
                    {format(String(item.value), "uusd")} UST
                  </Text>
                </Box>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default PieGraphCard;
