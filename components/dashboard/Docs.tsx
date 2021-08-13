import React, { FC } from "react";
import { Box, HStack, Text, Flex, Button } from "@chakra-ui/react";

import Card from "components/Card";
import NewspaperIcon from "components/icons/NewspaperIcon";
import ExternalLinkIcon from "components/icons/ExternalLinkIcon";

type Props = {};

const Docs: FC<Props> = () => {
  return (
    <Card h="full" bg="rgba(37, 39, 60, 0.2)" position="relative">
      <Flex h="full" justify="center" align="center" direction="column">
        <Box>
          <NewspaperIcon />
        </Box>
        <Text variant="light" fontSize="md" my="6" textAlign="center">
          Hungry for knowledge?
          <br />
          Read more about Nexus Protocol!
        </Text>
        <HStack spacing="4">
          <Button
            as="a"
            href="https://google.com"
            target="_blank"
            rightIcon={<ExternalLinkIcon width="1rem" height="1rem" />}
            variant="primary"
            size="lg"
          >
            Read docs
          </Button>
          <Button
            as="a"
            target="_blank"
            href="https://google.com"
            rightIcon={<ExternalLinkIcon width="1rem" height="1rem" />}
            variant="secondary"
            size="lg"
          >
            Read articles
          </Button>
        </HStack>
      </Flex>
      <Box
        position="absolute"
        bg="radial-gradient(50% 50% at 50% 50%, #F4B6C7 0%, rgba(36, 38, 57, 0) 100%)"
        height="200px"
        left="0"
        right="0"
        bottom="-150px"
        opacity="0.2"
      />
    </Card>
  );
};

export default Docs;
