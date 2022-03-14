import React, { FC } from "react";
import {
    Box, Tabs, Text, Center, Flex, HStack, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react";

import Card from "components/Card";
import VaultTrackerItem from "./VaultTrackerItem";
import { useMediaQuery } from '@chakra-ui/react'


type Trade = {
    txhash: String;
    timestamp: String;
    vaultName: String;
    arb_assets: String;
    profit: String;
};

type Props = {
    vaultTrades: Trade[];
};

const VaultTracker: FC<Props> = ({ vaultTrades }) => {

    const [isMobile] = useMediaQuery('(max-width:480px)')

    if (isMobile)
        return (
            <>
                {
                    vaultTrades.map((trade) => (
                        <Card width="100%" flexDirection="column" mb="5">
                            <Tabs variant="soft-rounded">
                                {
                                    (!vaultTrades.length) && (
                                        <Center  >
                                            <Text variant="light" lineHeight="1" textTransform="capitalize">
                                                No trades
                                            </Text>
                                        </Center>
                                    )
                                }
                                 <VaultTrackerItem trade={trade} />
                            </Tabs>
                        </Card>
                    ))
                }
            </>
        )


    return (
        <Card width="100%">
            <Tabs variant="soft-rounded">
                <Flex mb="5">
                    <Text variant="light" flex={1} size="lg" textTransform="capitalize"> TxHash </Text>
                    <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Timestamp </Text>
                    <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Vault </Text>
                    <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Arb Pairs </Text>
                    <Text variant="light" flex={1} textAlign="end" size="lg" textTransform="capitalize"> Profit </Text>
                </Flex>
                {
                    (!vaultTrades.length) && (
                        <Center  >
                            <Text variant="light" lineHeight="1" textTransform="capitalize">
                                No trades
                            </Text>
                        </Center>
                    )
                }
                {vaultTrades.map((trade) => <VaultTrackerItem trade={trade} />)}
            </Tabs>
        </Card>
    );
};

export default VaultTracker;

        // <Card width="100%">
        //     <Tabs variant="soft-rounded">
        //         <Flex justify="space-between" align="center">
        //             <Text color="#fff" size="lg" mb="10" textTransform="capitalize"> TxHash </Text>
        //             <Text color="#fff" size="lg" mb="10" textTransform="capitalize"> Timestamp </Text>
        //             <Text color="#fff" size="lg" mb="10" textTransform="capitalize"> Vault </Text>
        //             <Text color="#fff" size="lg" mb="10" textTransform="capitalize"> Arb Pairs </Text>
        //             <Text color="#fff" size="lg" mb="10" textTransform="capitalize"> Profit </Text>
        //         </Flex>
        //         {
        //             (!vaultTrades.length) && (
        //                 <Center  >
        //                     <Text variant="light" lineHeight="1" textTransform="capitalize">
        //                         No trades
        //                     </Text>
        //                 </Center>
        //             )
        //         }
        //         {vaultTrades.map((trade) =>  <VaultTrackerItem trade={trade} /> )}
        //     </Tabs>
        // </Card>