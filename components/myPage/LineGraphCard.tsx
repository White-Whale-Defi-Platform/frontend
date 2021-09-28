import { Box, Flex, Text, Center, Divider } from "@chakra-ui/react";
import { NextPage } from "next";

import Card from "components/Card";
import LineChart from "components/LineChart";

type DataIrtem = {
  label: string;
  value: number;
};

type Cell = {
  label: string;
  value: string;
};

type Props = {
  cells: Cell[];
  data: DataIrtem[];
};

const LineGraphCard: NextPage<Props> = ({ cells, data }) => {
  const renderDivider = (index) => {
    if (index === cells.length - 1) {
      return;
    }

    return (
      <Center h="16" px="12">
        <Divider
          orientation="vertical"
          borderColor="rgba(255, 255, 255, 0.1)"
        />
      </Center>
    );
  };

  return (
    <Card h="full">
      <Flex align="center">
        {cells.map((cell, index) => {
          return (
            <>
              <Box key={cell.label}>
                <Text fontSize="xl" mb="4" fontWeight="bold">
                  {cell.label}
                </Text>
                <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                  {cell.value}
                </Text>
              </Box>
              {renderDivider(index)}
            </>
          );
        })}
      </Flex>
      <Box height="200" mt="12">
        <LineChart data={data} />
      </Box>
    </Card>
  );
};

export default LineGraphCard;
