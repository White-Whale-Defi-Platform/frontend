import React, { FC, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { num, useTerraWebapp, useBalance } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";

type Props = {
  onChange: any;
  asset: string;
  max?: string;
};

const AmountMaxButton: FC<Props> = ({ onChange, max, asset }) => {
  const { taxRate, taxCap } = useTerraWebapp();

  const balance = useBalance(asset);

  const amount = useMemo(() => {
    if (taxRate == null || taxCap == null) {
      return null;
    }

    if (max != null) {
      return max;
    }

    const formattedTaxCap = taxCap.amount.div(ONE_TOKEN).toString();
    const formattedTaxRate = taxRate.toString();
    const balanceWithBuffer = num(balance).div(ONE_TOKEN).minus(2);
    const taxRateFormula = num("1")
      .plus(formattedTaxRate)
      .times(formattedTaxRate);

    if (asset == "uusd") {
      if (balanceWithBuffer.div(taxRateFormula).lt(formattedTaxCap)) {
        return balanceWithBuffer.div(num(formattedTaxRate).plus("1"));
      }

      return balanceWithBuffer.minus(formattedTaxCap);
    }

    return num(balance).div(ONE_TOKEN).toFixed(6);
  }, [asset, balance, max, taxCap, taxRate]);

  if (amount == "0") {
    return;
  }

  return (
    <chakra.button
      type="button"
      outline="none"
      color="brand.500"
      fontWeight="500"
      onClick={() => onChange(amount)}
    >
      Max
    </chakra.button>
  );
};

export default AmountMaxButton;
