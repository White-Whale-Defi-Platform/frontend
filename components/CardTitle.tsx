import React, { FC, ReactNode } from "react";
import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";

import InfoIcon from "components/icons/InfoIcon";

type Props = {
  label: string;
  value?: string;
  icon?: ReactNode;
  asset?: string;
  tooltip?: string;
};

const CardTitle: FC<Props> = ({ label, value, icon, asset, tooltip }) => {
  return (
    <Box>
      <HStack mb="3">
        <Text fontSize="lg" mb="2">
          {label}
        </Text>
        {tooltip && (
          <Tooltip
            label={tooltip}
            placement="top"
            hasArrow
            aria-label="Staking tooltip"
          >
            <Box cursor="pointer" color="brand.200">
              <InfoIcon width="1rem" height="1rem" />
            </Box>
          </Tooltip>
        )}
      </HStack>
      <HStack align="baseline">
        {icon && <Box alignSelf="center">{icon}</Box>}
        {value && (
          <Text
            color="brand.500"
            fontWeight="700"
            fontSize="3xl"
            lineHeight="1"
          >
            {value}
          </Text>
        )}
        {asset && (
          <Text color="brand.500" fontWeight="700" lineHeight="1">
            {asset}
          </Text>
        )}
      </HStack>
    </Box>
  );
};

export default CardTitle;
