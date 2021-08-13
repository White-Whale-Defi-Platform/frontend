import React, { FC } from "react";
import { Flex, Box, Text, HStack, Tooltip } from "@chakra-ui/react";

import InfoIcon from "components/icons/InfoIcon";
import { sum } from "libs/math";
import { format } from "libs/parse";
import useFee from "hooks/useFee";
import useTax from "hooks/useTax";

type Props = {
  gasAdjust?: number;
  /** uusd amount for tax calculation */
  pretax?: string;
  /** Exclude tax from the contract */
  deduct?: boolean;
};

const TaxFee: FC<Props> = ({ gasAdjust, pretax, deduct }) => {
  const fee = useFee(1, gasAdjust);
  const { calcTax } = useTax();
  const tax = pretax ? calcTax(pretax) : "0";
  const uusdAmount = !deduct
    ? sum([pretax ?? "0", tax, fee.amount])
    : fee.amount;

  return (
    <Box lineHeight="1">
      <HStack>
        <Flex color="brand.200" align="center">
          <Text variant="light" mr="1">
            Tx Fee
          </Text>
          <Tooltip
            label="Fee paid to execute this transaction"
            placement="top"
            hasArrow
            aria-label="Staking tooltip"
          >
            <Box cursor="pointer" color="brand.200">
              <InfoIcon width="1rem" height="1rem" />
            </Box>
          </Tooltip>
          <Text variant="light">:</Text>
        </Flex>
        <Text fontWeight="500" fontSize="sm">
          {format(uusdAmount.toString(), "uusd")} UST
        </Text>
      </HStack>
    </Box>
  );
};

export default TaxFee;
