import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SimpleStat from "components/SimpleStat";

type Props = {
  label: any;
  value: any;
  asset: any;
};

const CardLine: FC<Props> = ({ label, value, asset }) => {
  return (
    <Flex justify="space-between">
      <Text fontWeight="bold">{label}</Text>
      <SimpleStat
        value={value}
        asset={asset}
        fontSizeValue="xl"
        fontSizeAsset="sm"
      />
    </Flex>
  );
};

export default CardLine;
