import { Box, Heading, HStack, Flex, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";

import Treasury from "components/Treasury";
import WhaleCard from "components/WhaleCard";
import { usevUSTPrice } from "hooks/usevUSTPrice";
import VUSTExchangeIcon from "../../components/icons/vUSTExchangeIcon";
import USTExchangeIcon from "../../components/icons/USTExchangeIcon";
import { useTokenInfo } from "@arthuryeti/terraswap";
import BuyBackCard from "components/BuyBackCard";

import {
  Tag,
} from '@chakra-ui/react'


const Dashboard: NextPage = () => {
  const { getIcon, getSymbol } = useTokenInfo();
  const vUSTPrice = usevUSTPrice();
  // console.log(`vUSTpriceinfo  ${vUSTPrice}`);

  return (
    <Box my="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        Dashboard
      </Heading>
      <Flex align="end" justify="end" mt="0" mb="2">
        {vUSTPrice && (
          <HStack justify="space-between" color="#fff" spacing="2">

            <Tag
              size={'lg'}
              key={'lg'}
              borderRadius='full'
              variant='solid'
              colorScheme='brand.400'

            >
              {/* TODO: There probably shouldn't be so many boxes here. There is defo a cleaner way to do this ? */}
              <Box m="1">1 </Box><Box m="1">  vUST</Box> <VUSTExchangeIcon token="vUST" />{' '}
              <Box m="1">≈</Box>{' '}
              <Box m="1">{vUSTPrice}{' '}</Box>
              <Box m="1">UST</Box> <USTExchangeIcon token="ust" />
            </Tag>
          </HStack>
        )}
      </Flex>


      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 2, md: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <Treasury />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 6 }}>
          {/* <GridItem rowSpan={{ base: 3, lg: 3 }}> */}
            <WhaleCard />
          {/* </GridItem> */}
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
            <BuyBackCard />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
