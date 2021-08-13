import React, { FC, ReactNode } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string;
  icon?: ReactNode;
  asset?: ReactNode;
};

const BarChartStat: FC<Props> = ({ icon, label, value, asset }) => {
  return (
    <Box lineHeight="1">
      <HStack spacing="3">
        <HStack>
          {icon}
          <Text color="#fff">{label}</Text>
        </HStack>
        <HStack color="brand.200" align="baseline" spacing="1">
          <Text fontWeight="bold">{value}</Text>
          <Text fontSize="xs">{asset}</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default BarChartStat;
