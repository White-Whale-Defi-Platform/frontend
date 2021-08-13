import React, { FC } from "react";
import { Box, HStack, Flex } from "@chakra-ui/react";

import Card from "components/Card";
import CardTitle from "components/CardTitle";
import LineChart from "components/LineChart";
import BarChart from "components/BarChart";
import Stat from "components/Stat";
import USTIcon from "components/icons/USTIcon";

const data = [
  {
    name: "Jan",
    value: 1.22,
  },
  {
    name: "Feb",
    value: 3.99,
  },
  {
    name: "Apr",
    value: 1.32,
  },
  {
    name: "May",
    value: 4.12,
  },
  {
    name: "Jun",
    value: 2.22,
  },
  {
    name: "Jul",
    value: 3.22,
  },
  {
    name: "Aug",
    value: 1.22,
  },
  {
    name: "Sep",
    value: 7.22,
  },
];

type Props = {};

const TotalBurned: FC<Props> = () => {
  return (
    <Card>
      <CardTitle
        label="Total LUNA burned in White Whale"
        value="91,180,812"
        asset="LUNA"
      />
      <Box height="250px" mt="8">
        <LineChart data={data} />
      </Box>
    </Card>
  );
};

export default TotalBurned;
