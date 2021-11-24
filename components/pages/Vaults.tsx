import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

import VaultItem from "components/vault/VaultItem";
import useContracts from "hooks/useContracts";

const Vaults = () => {
  const { ustVault } = useContracts();

  const data = [
    {
      contract: ustVault,
      name: "UST",
      logo: "/ust.png",
    },
    {
      contract: null,
      name: "LUNA",
      logo: "/terraCrypto.png",
    },
    {
      contract: null,
      name: "KRT",
      logo: "/krtCrypto.png",
    },
  ];
  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Box>
        <Heading color="#fff" size="lg" mb="10">
          Arb Vaults
        </Heading>
      </Box>
      <Flex
        mt="8"
        gridGap={{ base: 12, xl: 24 }}
        wrap={{ base: "wrap", xl: "nowrap" }}
      >
        {data.map((item) => (
          <VaultItem key={item.name} data={item} />
        ))}
      </Flex>
    </Box>
  );
};

export default Vaults;
