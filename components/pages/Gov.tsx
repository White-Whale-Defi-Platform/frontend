import React, { useMemo } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { NextPage } from "next";

import Warchest from "components/gov/Warchest";
import Polls from "components/gov/Polls";



const Gov: NextPage = () => {
  return (
    <Box mt="16" mx="auto" maxW="container.xl" >
      <Heading color="#fff" size="lg" mb="10">
        Governance
      </Heading>
      <Warchest />
      <Flex justify="space-between" mt="24" mb="6">
        <Heading color="#fff" size="lg">
          Polls
        </Heading>
        <HStack>
          <Link href="/gov/create-poll" passHref>
            <Button as="a" variant="secondary" size="sm">
              Create Poll
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Polls />
    </Box>
  );
};

export default Gov;
