import React, { FC } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

type Props = {
  asset: string;
  label?: string;
  initial?: string;
  hideLabel?: boolean;
};

const Balance: FC<Props> = ({
  asset,
  initial,
  label = "Available",
  hideLabel = false,
}) => {
  const balance = useBalance(asset);

  return (
    <Box>
      <HStack spacing="4">
        {!hideLabel && (
          <Text as="span" variant="light" color="white" fontSize="xs">
            {label}:
          </Text>
        )}{" "}
        <Text as="span" fontSize="xs" fontWeight="700" ml="3">
          {fromTerraAmount(initial ?? balance, "0,0.000")}
        </Text>
      </HStack>
    </Box>
  );
};

export default Balance;
