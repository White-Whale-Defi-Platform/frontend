import { Fragment } from "react";
import { Box, Flex, Text, Center, Divider } from "@chakra-ui/react";
import { NextPage } from "next";

import Card from "components/Card";
import LineChart from "components/LineChart";
import { Skeleton } from '@chakra-ui/react'


import PlusCircleIcon from "components/icons/PlusCircleIcon";

type DataIrtem = {
  label: string;
  value: number;
};

type Cell = {
  label: string;
  value: string;
  asset: string;
};

type Props = {
  cells: Cell[];
  data: DataIrtem[];
  vUSTPrice?: any;
};

const LineGraphCard: NextPage<Props> = ({ cells, data, vUSTPrice }) => {


  const renderDivider = (index) => {
    if (index === cells.length - 1) {
      return;
    }

    return (
      <Center h="16" px="7" display={{ base: "none", lg: "block" }}>
        <Divider
          orientation="vertical"
          borderColor="rgba(255, 255, 255, 0.1)"
        />
      </Center>
    );
  };

  return (
    <Card h="full">
      <Flex justify="space-between" direction="column" h="full">
        <Flex
          align={{ lg: "center" }}
          direction={{ base: "column", lg: "row" }}
        >
          {cells.map((cell, index) => {
            return (
              <Fragment key={cell.label}>
                <Box key={cell.label} mb={{ base: "4", lg: "0" }}>
                  <Text fontSize="xl" mb="4" fontWeight="bold">
                    {cell.label}
                  </Text>
                  {
                    !cell?.value || cell.value === "NaN" ? 
                    <Skeleton startColor='brand.100' endColor='brand.500' height='36px' /> : (
                      <Text
                        color="brand.500"
                        fontSize="2xl"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        {cell.value}
                        <Text as="span" fontSize="md">
                          {cell.asset}
                        </Text>
                      </Text>
                    )
                  }

                </Box>
                {renderDivider(index)}
              </Fragment>
            );
          })}
        </Flex>
        <Box height="240" mt="8">
          <LineChart data={data} />
        </Box>
      </Flex>
    </Card>
  );
};

export default LineGraphCard;
