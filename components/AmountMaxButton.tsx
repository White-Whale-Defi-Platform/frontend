import React, { FC, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { BN, useTerraWebapp, useBalance } from "@arthuryeti/terra";

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
    const formattedTaxRate = taxRate.toFixed(6);
    const formattedTaxCap = taxCap.amount.div(ONE_TOKEN).toFixed(6);
    const formattedBalance = BN(balance).div(ONE_TOKEN).toFixed(6);
    const balanceTaxRate = BN(formattedBalance)
      .minus("2")
      .div(BN("1").plus(formattedTaxRate));

    if (max != null) {
      return max;
    }

    if (asset == "uusd") {
      if (balanceTaxRate.isGreaterThan(formattedTaxCap)) {
        return balanceTaxRate;
      }

      return BN(formattedBalance).minus(2).minus(formattedTaxCap);
    }

    return formattedBalance;
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
