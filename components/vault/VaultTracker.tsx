import { Flex, Tabs, Text, useMediaQuery } from "@chakra-ui/react";
import Card from "components/Card";
import { ArbTrades } from "libs/arbTrades";
import React, { FC } from "react";
import VaultTrackerItem from "./VaultTrackerItem";

type Props = {
    vaultTrades: ArbTrades[]
}


const VaultTracker: FC<Props> = ({ vaultTrades = [] }) => {

    const [isMobile] = useMediaQuery('(max-width:480px)')

    return (
        <Card width="100%" pb="unset">
            <Tabs variant="soft-rounded">
                <Flex mb="5">
                    <Text variant="light" flex={2} size="lg" textTransform="capitalize"> TxHash </Text>
                    {
                        !isMobile && (
                            <>
                                <Text variant="light" flex={2} size="lg" textTransform="capitalize"> Timestamp </Text>
                                <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Vault </Text>
                            </>
                        )
                    }
                    <Text variant="light" flex={2} size="lg" textTransform="capitalize"> Arb Pairs </Text>
                    <Text variant="light" flex={isMobile ? "unset" : 1} textAlign="end" size="lg" textTransform="capitalize"> Profit </Text>
                </Flex>
                {vaultTrades.map((trade: ArbTrades, index) => <VaultTrackerItem key={trade.txhash} trade={trade} isLast={index + 1 === vaultTrades.length} />)}
            </Tabs>
        </Card>
    );
};

export default VaultTracker;