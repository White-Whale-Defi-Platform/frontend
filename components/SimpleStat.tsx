import React, { FC } from "react";
import { Text, HStack } from "@chakra-ui/react";
import { Tooltip } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

type Props = {
  label?: string;
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
  label
}) => {
  return (
    <HStack
      color="brand.500"
      spacing="1"
      fontWeight="700"
      align="baseline"
      lineHeight="1"
    >
      {/* {label === "APY" && (
        <Tooltip label='25% APR' fontSize='sm' >
          <InfoOutlineIcon ml="2" />
        </Tooltip>
      )} */}
      <Text fontSize={fontSizeValue}>{value}</Text>
      <Text fontSize={fontSizeAsset}>{asset}</Text>

    </HStack>
  );
};

export default SimpleStat;
