import React, { FC } from "react";
import { Text, HStack, Box, Flex, Image, Divider } from "@chakra-ui/react";

import BondModal from "components/bond/BondModal";

type Props = {
  data: any;
};

const BondItem: FC<Props> = ({ data }) => {
  return (
    <>
      <Flex align="center">
        <HStack flex="1" spacing="4">
          <HStack spacing="-5">
            <Box
              bg="#252525"
              border="2px solid rgba(255, 255, 255, 0.1);"
              borderRadius="full"
              p="2.5"
              position="relative"
              zIndex="2"
            >
              <Image src={data.icon1} alt="logo-small" boxSize="1.5rem" />
            </Box>
            {data.icon2 && (
              <Box
                border="2px solid rgba(255, 255, 255, 0.1);"
                borderRadius="full"
                p="2.5"
              >
                <Image src={data.icon2} alt="ust" boxSize="1.5rem" />
              </Box>
            )}
          </HStack>
          <Box>
            <Text variant="brand.500" whiteSpace="nowrap">
              {data.name}
            </Text>
          </Box>
        </HStack>
        <Box flex="1">
          <Text variant="brand.500">{data.price}</Text>
        </Box>
        <Box flex="1">
          <Text variant="brand.500">{data.roi}</Text>
        </Box>
        <Box flex="1">
          <Text variant="brand.500">{data.purchased}</Text>
        </Box>
        <Flex flex="1" justify="flex-end">
          <BondModal tokenContract={data.contract} />
        </Flex>
      </Flex>
      <Divider
        borderColor="rgba(255, 255, 255, 0.1)"
        _last={{ display: "none" }}
      />
    </>
  );
};

export default BondItem;
