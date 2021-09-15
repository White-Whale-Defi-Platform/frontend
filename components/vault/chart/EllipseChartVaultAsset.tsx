import React, { FC } from "react";
import { Flex, BoxProps } from "@chakra-ui/react";

type Props = {} & BoxProps;

const EllipseChartVaultAsset: FC<Props> = ({ ...props }) => {
  return (
    <Flex {...props}>
      <svg
        width="176"
        height="176"
        viewBox="0 0 228 228"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="114" cy="114" r="114" fill="#3CCD64" />
      </svg>
    </Flex>
  );
};
export default EllipseChartVaultAsset;
