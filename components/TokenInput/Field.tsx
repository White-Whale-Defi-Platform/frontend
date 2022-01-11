import React, { FC } from "react";
import { Box, forwardRef } from "@chakra-ui/react";

import { Single, SingleLP } from "components/TokenInput";

type Props = {
  tokens?: string[];
  isLpToken?: boolean;
  isSingle?: boolean;
  onBlur: any;
  onChange: any;
  value: string;
};

const Field: FC<Props> = forwardRef(({ value, onChange, isLpToken }, ref) => {
  const handleClick = (asset: string) => {
    onChange(asset);
  };

  const renderSingle = () => {
    if (isLpToken) {
      return (
        <Box pr="8">
          <SingleLP asset={value} />
        </Box>
      );
    }

    return (
      <Box pr="8">
        <Single asset={value} />
      </Box>
    );
  };

  return <Box ref={ref}>{renderSingle()}</Box>;
});

export default Field;
