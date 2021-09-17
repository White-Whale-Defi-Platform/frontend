import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";

type Props = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps &
  MotionProps;

const MotionBox = motion(Box);

const Card: FC<Props> = ({ children, noPadding = false, ...props }) => {
  return (
    <MotionBox
      bg="rgba(26,26,26,0.8)"
      boxShadow="0px 40px 40px rgba(0, 0, 0, 0.5)"
      p={!noPadding && "8"}
      borderRadius="2xl"
      position="relative"
      overflow="hidden"
      color="white"
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default Card;
