import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

import VaultItem from "components/vault/VaultItem";

const data = [
  {
    contract: "terra17cwxg7cgwtrxlytnxh00zjk659zk5tgk5ey3rt",
    name: "UST",
    logo: "/ust.png",
  },
  {
    contract: null,
    name: "KRT",
    logo: "/krtCrypto.png",
  },
  {
    contract: null,
    name: "LUNA/bLUNA",
    logo: "/terraCrypto.png",
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
