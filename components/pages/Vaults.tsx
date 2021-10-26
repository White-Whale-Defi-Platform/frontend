import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

import VaultItem from "components/vault/VaultItem";

const data = [
  {
    contract: "terra1la89l08clsk3n9rtzyte6k47dacuvcq7q84k3m",
    name: "UST",
    logo: "/ust.png",
  },
  {
    contract: "dss",
    name: "LUNA",
    logo: "/terraCrypto.png",
  },
  {
    contract: null,
    name: "KRT",
    logo: "/krtCrypto.png",
  },
];

const Vaults = () => {
  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Box>
        <Heading color="#fff" size="lg" mb="10">
          Arb Vaults
        </Heading>
      </Box>
      <Flex mt="8" gridGap="24">
        {data.map((item) => (
          <VaultItem key={item.name} data={item} />
        ))}
      </Flex>
    </Box>
  );
};

export default Vaults;
