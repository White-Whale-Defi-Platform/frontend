import React, { useMemo } from "react";
import { Box, Grid, GridItem, Heading, Flex, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import SubmitPollForm from "components/createPoll/SubmitPollForm";
import Suggestions from "components/createPoll/Suggestions";



const CreatePoll = () => {
  return (
    <Box mt="8" mx="auto" maxW="container.xl">
      <Box color="brand.500" mb="8">
        <Link href="/gov">
          <a>
            <ArrowBackIcon boxSize={6} />
            Back to Governance
          </a>
        </Link>
      </Box>
      <Flex justify="space-between">
        <Heading color="#fff" size="lg" mb="10">
          Create Poll
        </Heading>
        <Box
          as="button"
          mr="17px"
          borderRadius="full"
          color="white"
          border="1px solid #fff"
          alignSelf="center"
          padding="2px 20px"
        >
          <Text>Join Forum</Text>
        </Box>
      </Flex>

      <Grid templateColumns="repeat(12, 1fr)" gridAutoRows="1fr" gap={12}>
        <GridItem colSpan={[12, null, 6]}>
          <Suggestions />
        </GridItem>
        <GridItem colSpan={[12, null, 6]}>
          <SubmitPollForm />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CreatePoll;
