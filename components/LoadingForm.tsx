import React, { FC } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const LoadingForm: FC = () => {
  return (
    <Flex flexDir="column" align="center">
      <Spinner
        mt="6"
        thickness="2rem"
        speed="0.65s"
        emptyColor="whiteAlpha.100"
        color="brand.500"
        size="xl"
      />
    </Flex>
  );
};

export default LoadingForm;
