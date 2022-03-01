import { Box, Heading, HStack, Flex, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";

import Treasury from "components/Treasury";
import WhaleCard from "components/WhaleCard";
import TransactionListCard from "components/myPage/TransactionListCard";
import { usevUSTPrice } from "hooks/usevUSTPrice";
import VUSTExchangeIcon from "../../components/icons/vUSTExchangeIcon";
import USTExchangeIcon from "../../components/icons/USTExchangeIcon";
import { useTokenInfo } from "@arthuryeti/terraswap";
import BLunaIcon from "components/icons/BLunaIcon";
import NLunaIcon from "components/icons/NLunaIcon";

const Dashboard: NextPage = () => {
  const { getIcon, getSymbol } = useTokenInfo();
  const vUSTPrice = usevUSTPrice();
  console.log(`vUSTpriceinfo  ${vUSTPrice}`);
  
  const icon = getIcon("uusd");
  return (
    <Box my="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        Dashboard
        </Heading>
        <Flex align="end" justify="end" mt="0" mb="2">
            {vUSTPrice && (
                <HStack color="#fff" spacing="2">

                  <p>1 </p><small>vUST</small> <VUSTExchangeIcon token="vUST" />{' '}
                  <small>≈</small>{' '}
                  <p>{vUSTPrice}{' '}</p>
                  <small>UST</small> <USTExchangeIcon token="ust" />
                  </HStack>
        )}
        </Flex>
      

      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 2, md: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 5 }}>
          <Treasury />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 7 }}>
          <GridItem rowSpan={{ base: 3, lg: 3 }}>
        
    </GridItem>
          <WhaleCard />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 12 }}>
          {/* <TransactionListCard/> */}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
