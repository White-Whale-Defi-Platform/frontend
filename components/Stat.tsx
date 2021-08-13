import React, { FC, ReactNode } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string;
  asset?: ReactNode;
};

const Stat: FC<Props> = ({ label, value, asset }) => {
  return (
    <Box lineHeight="1">
      <Text fontSize="lg" mb="6">
        {label}
      </Text>
      <HStack align="baseline">
        <Text color="brand.500" fontWeight="700" fontSize="3xl" lineHeight="1">
          {value}
        </Text>
        <Text color="brand.500" fontWeight="700" lineHeight="1">
          {asset}
        </Text>
      </HStack>
    </Box>
  );
};

export default Stat;
