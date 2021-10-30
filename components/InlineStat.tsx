import React, { FC } from "react";
import { Flex, Box, Text, HStack, Tooltip } from "@chakra-ui/react";

import InfoIcon from "components/icons/InfoIcon";

type Props = {
  label: string;
  value: string | number;
  name?: string;
  tooltip?: string;
};

const InlineStat: FC<Props> = ({ label, value, name, tooltip }) => {
  return (
    <Box lineHeight="1">
      <HStack>
        <Flex color="brand.200" align="center">
          <Text fontSize="xs" mr="1" color="whiteAlpha.600">
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
        </Flex>
        <Text fontWeight="500" fontSize="xs">
          {value} {name}
        </Text>
      </HStack>
    </Box>
  );
};

export default InlineStat;
