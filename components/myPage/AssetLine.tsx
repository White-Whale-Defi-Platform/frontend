import React, { FC } from "react";
import Head from "next/head";
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Flex,
  Button,
  Stack,
  Text,
  HStack,
  Center,
  Divider,
  Tag,
  Circle,
  Tooltip,
} from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { InfoOutlineIcon } from '@chakra-ui/icons'

const graphData = "1";

type Props = {
  data: any;
};

const AssetLine: FC<Props> = ({ data }) => {
  return (
    <Box key={data.label}>
      <HStack spacing="2">
        <Circle size="18" bgColor={data.color} />
        <Text whiteSpace="nowrap">{data.label}</Text>
        {
          data?.tooltip && (
            <Tooltip label={data.tooltip} maxW="160px" bg="blackAlpha.900" fontSize="xs" color="brand.500" borderRadius={10} >
              <InfoOutlineIcon ml="2" mb="1" color="brand.500" fontSize="xs" />
            </Tooltip>
          )
        }

      </HStack>
      <Text color="#8b8b8c" fontWeight="700">
        {data.value} {data.asset}
      </Text>
    </Box>
  );
};

export default AssetLine;
