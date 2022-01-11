import React, { FC } from "react";
import { Box, Text, Flex, HStack } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

type Props = {
  asset: string;
  initial?: string;
  label?: string;
  hideLabel?: boolean;
};

const BalanceLP: FC<Props> = ({
  asset,
  label = "Available",
  initial,
  hideLabel = false,
}) => {
  const balance = useBalance(asset);

  return (
    <Box>
      <HStack spacing="4">
        {!hideLabel && (
          <Text fontSize="sm" fontWeight="500" color="white.400" maxW="24">
            {label}:
          </Text>
        )}{" "}
        <Text fontSize="sm" color="white" ml="2">
          {fromTerraAmount(initial ?? balance, "0,0.00")}
        </Text>
      </HStack>
    </Box>
  );
};

export default BalanceLP;
