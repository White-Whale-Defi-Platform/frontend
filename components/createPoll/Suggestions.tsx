import React from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Image,
  Center,
  Divider,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Card from "components/Card";

const Suggestions = () => {
  return (
    <Card noPadding>
      <Stack bg="blackAlpha.400" pt="6" px="6" rounded="2xl">
        <HStack mb="6">
          <Text color="#fff" fontSize="2xl" fontWeight="700">
            Suggestions
          </Text>
        </HStack>
      </Stack>

      <HStack px="6" py="2">
        <Box pt="4" flex="1">
          <RadioGroup defaultValue="1">
            <Flex mb="4" justify="space-between">
              <Text fontSize="xl">Submit text poll</Text>
              <Radio
                alignSelf="center"
                colorScheme="brand"
                value="1"
                size="md"
              />
            </Flex>
            <Divider borderColor="brand.600" my="2" />
            <Flex my="4" justify="space-between">
              <Text fontSize="xl">Spend community pool</Text>
              <Radio alignSelf="center" colorScheme="brand" value="2" />
            </Flex>
          </RadioGroup>
        </Box>
      </HStack>
    </Card>
  );
};

export default Suggestions;
