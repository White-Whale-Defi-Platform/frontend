import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

const BarChartItem = ({ item }) => {
  const width = `${item.value * 100}%`;

  return (
    <Box
      width={width}
      borderRight="1px solid"
      borderRightColor="#464767"
      h="6"
      _last={{
        border: "none",
      }}
      bg={item.color}
    />
  );
};

type Props = {
  data: any;
};

const BarChart: FC<Props> = ({ data }) => {
  return (
    <Flex w="full" borderRadius="full" overflow="hidden">
      {data.map((item) => {
        return <BarChartItem key={item.name} item={item} />;
      })}
    </Flex>
  );
};

export default BarChart;
