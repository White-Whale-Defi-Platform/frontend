import React, { FC, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";

import Card from "components/Card";
import CardTitle from "components/CardTitle";
import LineChart from "components/LineChart";

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

const TokenPrice: FC<Props> = () => {
  const [totalValue, setTotalValue] = useState("$7.22");

  return (
    <Card noPadding>
      <Box p="6">
        <CardTitle label="Terraswap price of PSi" value={totalValue} />
      </Box>
      <Box height="250px" pb="4">
        <LineChart
          data={data}
          onValueChange={(value) => {
            setTotalValue(`$${value}`);
          }}
          onMouseLeave={() => {
            setTotalValue("$7.22");
          }}
        />
      </Box>
    </Card>
  );
};

export default TokenPrice;
