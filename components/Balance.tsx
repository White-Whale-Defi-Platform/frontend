import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

type Props = {
  asset: string;
};

const Balance: FC<Props> = ({ asset }) => {
  const balance = useBalance(asset);

  return (
    <Text ml="6">
      <Text as="span" variant="light" color="white" fontSize="xs">
        Available:
      </Text>
      <Text as="span" fontSize="xs" fontWeight="700" ml="3">
        {fromTerraAmount(balance, "0,0.0[00]")}
      </Text>
    </Text>
  );
};

export default Balance;
