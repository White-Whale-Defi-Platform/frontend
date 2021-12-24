import React, { FC } from "react";
import { Flex, Heading, Text, Box, Link } from "@chakra-ui/react";

import { truncate } from "libs/text";
import useFinder from "hooks/useFinder";

import Loader from "components/Loader";

type Props = {
  txHash: string;
};

const LoadingForm: FC<Props> = ({ txHash }) => {
  const finder = useFinder();

  return (
    <Flex flexDir="column" align="center" w="full" py="10">
      <Box mt="6">
        <Loader />
      </Box>

      <Heading fontSize="xl" mt="8">
        Waiting for receipt...
      </Heading>
      <Flex justify="space-between" align="center" mt="12" w="full">
        <Text variant="light" fontSize="md">
          Tx Hash
        </Text>
        <Link
          fontWeight="bold"
          href={finder(txHash, "tx")}
          target="_blank"
          color="white"
        >
          {truncate(txHash)}
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoadingForm;
