import { NextPage } from "next";
import { useWallet } from "@terra-money/wallet-provider";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import dayjs from "dayjs";

import { useTxHistoryQuery } from "modules/myPage";

import Card from "components/Card";

const TransactionListCard: NextPage = () => {
  const { data, isLoading } = useTxHistoryQuery();
  const { network } = useWallet();

  if (isLoading || data == null) {
    return null;
  }

  return (
    <Card h="full">
      {data.history.map(({ descriptions, timestamp, tx_hash, tx_type }) => {
        const formattedDate = dayjs(timestamp).format("LLLL");
        return (
          <Box mb="12" key={tx_hash} _last={{ mb: "0" }}>
            <Link
              href={`https://finder.terra.money/${network.chainID}/tx/${tx_hash}`}
              target="_blank"
              rel="noreferrer"
            >
              <Flex justify="space-between" align="center">
                <div>
                  <Text color="brand.500" fontWeight="bold">
                    {tx_type}
                  </Text>
                  <Text
                    fontSize="lg"
                    dangerouslySetInnerHTML={{
                      __html: descriptions.join("<br/>"),
                    }}
                  ></Text>
                </div>
                <Text fontSize="lg">{formattedDate}</Text>
              </Flex>
            </Link>
          </Box>
        );
      })}
    </Card>
  );
};

export default TransactionListCard;
