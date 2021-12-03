import React, { FC } from "react";
import {
  Stack,
  HStack,
  Box,
  Heading,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import Card from "components/Card";
import { NextPage } from "next";

import BondCardHeader from "components/bond/BondCardHeader";
import WhaleUstBond from "components/bond/WhaleUstBond";
import USTBond from "components/bond/USTBond";
import LunaBond from "components/bond/LunaBond";

const Bond: NextPage = () => {
  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Stack justify="space-between" spacing="4" mb="10">
        <Heading color="#fff" size="lg" mb="4">
          Bond (1,1)
        </Heading>
        <Text as="span" variant="light">
          WHALE holders can submit proposals to utilize the Community Fund for
          further growth and development of the platform.
        </Text>
      </Stack>
      <Card noPadding h="full">
        <Stack py="8" px="8">
          <BondCardHeader />
          <WhaleUstBond />
          <Divider borderColor="rgba(255, 255, 255, 0.1)" my="2" />
          <LunaBond />
          <Divider borderColor="rgba(255, 255, 255, 0.1)" my="2" />
          <USTBond />
        </Stack>
      </Card>
    </Box>
  );
};

export default Bond;
