import { NextPage } from "next";
import Card from "components/Card";
import CardTitle from "components/CardTitle";
import { useWallet } from '@terra-money/wallet-provider';
import { useTxHistoryQuery } from "modules/myPage/hooks/useTxHistory";
import {
    Box,
    Flex,
    Text,
    Link,
} from "@chakra-ui/react";

type Props = {
    title: string;
};

const TransactionListCard: NextPage<Props> = ({ title }) => {
    const { history, isLast, inProgress } = useTxHistoryQuery();
    const { network } = useWallet();
    return (
        <Card h="full">
            <CardTitle label={title} />

            {history.length > 0 && (

                <ul>
                    {history.map(({ descriptions, timestamp, tx_hash, tx_type }, i) => {
                        const datetime = new Date(timestamp);
                        return (
                            <Box p="8" flex="1" key={'txhistory' + tx_hash + '_' + i}>

                                <Link
                                    href={`https://finder.terra.money/${network.chainID}/tx/${tx_hash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Flex justify="space-between">
                                        <div>

                                            <Text color="brand.500">{tx_type}</Text>
                                            <p>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: descriptions.join('<br/>'),
                                                    }}
                                                />
                                            </p>
                                        </div>
                                        <time>
                                            {datetime.toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                            {', '}
                                            <span className="time">
                                                {datetime.toLocaleTimeString('en-US')}
                                            </span>
                                        </time>
                                    </Flex>
                                </Link>
                            </Box>
                        );
                    })}
                </ul>
            )}
            {history.length === 0 && !inProgress && (
                <Box>
                <h3>No transaction history</h3>
                <p>Looks like you haven't made any transactions yet.</p>
                </Box>
            )}
        </Card>
    );
};

export default TransactionListCard;