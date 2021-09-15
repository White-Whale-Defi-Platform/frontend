import React, { FC, useState } from "react";
import { Button, HStack, Flex, Text, Image } from "@chakra-ui/react";

import { useVault } from "modules/vault";
import Card from "components/Card";
import VaultLineActive from "components/vault/VaultLineActive";
import { format } from "libs/parse";
import VaultStat from "components/vault/VaultStat";

type Props = {
  data: any;
};

const VaultLine: FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { vault, balance, totalBalance } = useVault({
    contract: data.contract,
  });
  const balanceAmount = format(balance, "uusd");

  if (isOpen) {
    return (
      <VaultLineActive
        item={data}
        vault={vault}
        balance={balance}
        totalBalance={totalBalance}
        onClose={() => setIsOpen(false)}
      />
    );
  }

  return (
    <Card py="4">
      <HStack justifyContent="space-between">
        <HStack spacing="4" flex="1">
          <Image src={data.logo} alt={data.logo} boxSize="2.25rem" />
          <Text color="#fff" fontSize="xl" fontWeight="700">
            {data.name}
          </Text>
        </HStack>
        <HStack spacing="8">
          <HStack
            spacing="24"
            display={{ base: "none", sm: "none", md: "inherit" }}
          >
            <VaultStat label="APR" value="--" />
            <VaultStat label="Daily Yield" value="--" />
            <VaultStat label="My Deposit" value={balanceAmount} />
            <VaultStat label="Total Deposit" value={balanceAmount} />
          </HStack>
          <Button variant="primary" onClick={() => setIsOpen(!isOpen)}>
            +
          </Button>
        </HStack>
      </HStack>
    </Card>
  );
};

export default VaultLine;
