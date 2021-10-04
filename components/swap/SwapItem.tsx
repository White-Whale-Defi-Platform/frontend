import React, { FC } from "react";
import { Flex, Text, HStack, Image } from "@chakra-ui/react";

import { TriangleDownIcon } from "@chakra-ui/icons";

type Props = {
  value: string;
  asset: string;
  logo: string;
};

const SwapItem: FC<Props> = ({ value, asset, logo }) => {
  return (
    <Flex
      justifyContent="space-between"
      width="full"
      border="2px solid rgba(255, 255, 255, 0.1);"
      boxSizing="border-box"
      borderRadius="full"
      padding="22px 1.25rem"
    >
      <HStack spacing="1.6875rem">
        <Image src={logo} alt="Vector" width="2.375remm" height="2.375rem" />
        <Text fontSize="xl" fontWeight="700">
          {" "}
          {asset}{" "}
        </Text>
        <Flex
          opacity="0.33"
          display={{ base: "none", sm: "none", md: "inherit" }}
        >
          <TriangleDownIcon w={3} h={3} />
        </Flex>
      </HStack>
      <Text color="brand.500" fontSize="xl" fontWeight="700">
        {value}
      </Text>
    </Flex>
  );
};

export default SwapItem;
