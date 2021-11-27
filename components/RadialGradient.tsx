import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";

const RadialGradient: FC = () => {
  return (
    <chakra.div
      position="fixed"
      width="1920px"
      height="1178px"
      left="-605px"
      top="686px"
      bg="rgba(60, 205, 100, 0.1)"
      filter="blur(150px)"
      borderTopRightRadius="20%"
      zIndex="-1"
    />
  );
};

export default RadialGradient;
