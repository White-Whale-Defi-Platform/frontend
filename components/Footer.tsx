import React, { FC } from "react";
import { Text, HStack } from "@chakra-ui/react";

import useNetwork from "hooks/useNetwork";

const Footer: FC = () => {
  const { name } = useNetwork();

  return (
    <HStack py="4" color="brand.100" fontSize="sm" spacing="4" pb="8">
      <Text>Ver 1.0.000</Text>
      <Text>Updated: 22 Jan 2021</Text>
      <Text>{name}</Text>
    </HStack>
  );
};

export default Footer;
