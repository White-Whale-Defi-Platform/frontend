import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";

const RadialGradient: FC = () => {
  return (
    <chakra.div
      position="absolute"
      width="1000px"
      height="1000px"
      left="-500px"
      top="-500px"
      transform="rotate(-180deg)"
      bg="radial-gradient(50% 50% at 50% 50%, #41425B 0%, rgba(36, 38, 57, 0) 100%)"
      opacity="0.8"
      zIndex="-1"
    />
  );
};

export default RadialGradient;
