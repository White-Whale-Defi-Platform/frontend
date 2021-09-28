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
} from "@chakra-ui/react";

const graphData = "1";

type Props = {
  data: any;
};

const AssetLine: FC<Props> = ({ data }) => {
  return (
    <Flex
      bg="rgba(255, 255, 255, 0.05)"
      borderRadius="full"
      mb="3"
      py="1"
      px="4"
      align="center"
      justify="space-between"
      _last={{
        mb: "0",
      }}
    >
      <HStack spacing="2">
        <Circle size="18" bgColor={data.color} />
        <Text whiteSpace="nowrap">{data.label}</Text>
      </HStack>
      <HStack align="baseline" color="brand.200" spacing="2">
        <Text fontSize="sm" fontWeight="700">
          {data.value}
        </Text>
        <Text fontSize="xs" color="#8b8b8c">
          {data.asset}
        </Text>
      </HStack>
    </Flex>
  );
};

export default AssetLine;
