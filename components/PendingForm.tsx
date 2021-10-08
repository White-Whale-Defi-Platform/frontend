import React, { FC } from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";

import Loader from "components/Loader";

const PendingForm: FC = () => {
  return (
    <Flex flexDir="column" align="center">
      <Box mt="6">
        <Loader />
      </Box>

      <Heading fontSize="xl" mt="8">
        Waiting for Terra Station...
      </Heading>
    </Flex>
  );
};

export default PendingForm;
