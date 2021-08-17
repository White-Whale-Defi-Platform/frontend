import React from "react";
import { HStack, Text } from "@chakra-ui/react";

type Props = {
  label: any;
  value: any;
};

const VaultStat = ({ label, value }: Props) => {
  return (
    <HStack spacing="4" fontSize="lg">
      <Text color="#fff">{label}</Text>
      <Text color="brand.500" fontWeight="bold">
        {value}
      </Text>
    </HStack>
  );
};

export default VaultStat;
