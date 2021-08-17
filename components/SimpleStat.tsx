import React, { FC } from "react";
import { Text, HStack } from "@chakra-ui/react";

type Props = {
  value: string;
  asset: string;
  fontSizeValue: string;
  fontSizeAsset: string;
};

const SimpleStat: FC<Props> = ({
  value,
  asset,
  fontSizeValue,
  fontSizeAsset,
}) => {
  return (
    <HStack
      color="brand.500"
      spacing="1"
      fontWeight="700"
      align="baseline"
      lineHeight="1"
    >
      <Text fontSize={fontSizeValue}>{value}</Text>
      <Text fontSize={fontSizeAsset}>{asset}</Text>
    </HStack>
  );
};

export default SimpleStat;
