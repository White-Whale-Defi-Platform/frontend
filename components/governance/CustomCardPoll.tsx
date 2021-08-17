import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  number: any;
  status: any;
  information: any;
  endTime: any;
};

const CustomCardPoll: FC<Props> = ({
  number,
  status,
  information,
  endTime,
}) => {
  return (
    <Box
      p="8"
      border={number === "1" ? "2px solid #3CCD64" : "2px solid #444"}
      borderRadius="2xl"
    >
      <Text fontSize="xl" mb="8">
        #{number}
      </Text>
      <Text fontSize="large" fontWeight="700" color="brand.500" mb="2">
        {status}
      </Text>
      <Text fontSize="xl" fontWeight="700" mb="29px">
        {information}
      </Text>
      <Box w="full" h="1" bg="red.500" />
      <Flex mt="42px">
        <Text mr="14px">End time</Text>
        <Text color="brand.500" fontWeight="700">
          {endTime}
        </Text>
      </Flex>
    </Box>
  );
};

export default CustomCardPoll;
