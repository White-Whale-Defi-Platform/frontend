import React from "react";
import { Box, Heading, Flex, Center } from "@chakra-ui/react";

import VaultItem from "components/vault/VaultItem";
import VaultTracker from "components/vault/VaultTracker";
import useContracts from "hooks/useContracts";
import useReel from "hooks/useReel"
import { ArbTrades } from "libs/arbTrades";

const Vaults = () => {
  const { ustVault } = useContracts();
  const vaultTrades : ArbTrades[] = useReel()

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
    // {
    //   contract: null,
    //   name: "KRT",
    //   logo: "/krtCrypto.png",
    // },
  ];

  return (
    <Box mt="16" mx="auto" maxW="container.xl" paddingBottom="100px">
      <Box>
        <Heading color="#fff" size="lg" mb="10">
          Arb Vaults
        </Heading>
      </Box>
      <Center>
        <Flex
          mt="8"
          gridGap={{ base: 12, xl: 24 }}
          wrap={{ base: "wrap", xl: "nowrap" }}
          paddingBottom="50px"
        >
          {data.map((item) => (
            <VaultItem key={item.name} data={item} />
          ))}
        </Flex>
      </Center>
      <Box>
        <Heading color="#fff" size="lg" mb="10">
          Arb Trades
        </Heading>
        <VaultTracker vaultTrades={vaultTrades} />
      </Box>
    </Box>
  );
};

export default Vaults;
