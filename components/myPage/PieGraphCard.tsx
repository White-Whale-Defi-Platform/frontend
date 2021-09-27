import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Center,
  Divider,
  Circle,
} from "@chakra-ui/react";
import { NextPage } from "next";

import Card from "components/Card";
import CardTitle from "components/CardTitle";
import PieChart from "components/PieChart";
import { format } from "libs/parse";

type DataIrtem = {
  label: string;
  value: number;
  color: string;
};

type Cell = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  value: string;
  asset: string;
  data: DataIrtem[];
};

const PieGraphCard: NextPage<Props> = ({ title, value, asset, data }) => {
  return (
    <Card h="full">
      <CardTitle label={title} value={value} asset={asset} />

      <Flex mt="8" align="center">
        <Box h="175" pr="8" flex="1">
          <PieChart data={data} innerRadius={55} outerRadius={75} />
        </Box>

        <Flex justify="center" flexDir="column" gridGap="4" flex="1">
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
    </Card>
  );
};

export default PieGraphCard;
