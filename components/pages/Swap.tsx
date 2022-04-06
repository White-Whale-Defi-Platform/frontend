import React from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text, Grid, GridItem } from "@chakra-ui/react";

import useContracts from "hooks/useContracts";

import Card from "components/Card";
import PoolItem from "components/swap/PoolItem";
import SwapForm from "components/swap/SwapForm";
import { HStack, Icon , Link} from '@chakra-ui/react'
import { BiDollarCircle } from 'react-icons/bi'

const Swap: NextPage = () => {
  const { whaleUstLpToken, whaleUstPair, whaleUstStaking } = useContracts();

  function handleRemoveKadoRamp(event): void {
    if (event.data === 'ejectKadoRamp') {
      const element = document.getElementById('kadoRampOverlay');
      element?.parentNode?.removeChild(element);
      window.removeEventListener('message', handleRemoveKadoRamp);
    }
  }

  const handleButton = (e): void => {
    console.log("here")
    const kadoRamp = document.createElement('iframe');
    kadoRamp.src = 'https://ramp.kado.money/global';
    kadoRamp.id = 'kadoRampOverlay';
    Object.assign(kadoRamp.style, { 'z-index': '2147483647', 'width': '100vw', 'height': '100vh', 'border': 'none', 'border-width': '0', 'position': 'fixed', 'top': '0', 'left': '0', 'right': '0', 'bottom': '0' , 'background-color' : 'rgb(25,25,25,0.7)'});
    document.body.appendChild(kadoRamp);
    window.addEventListener('message', handleRemoveKadoRamp, false);
  }

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Flex gridGap="24">
        <Box flex="1" >
          <HStack justifyContent="space-between" alignItems="stretch">
            <Heading color="#fff" size="lg" mb="8">
              Swap
            </Heading>
            <Link onClick={handleButton}>
              <Flex alignItems="center">
                <Icon fontSize="lg" color="brand.500" as={BiDollarCircle} />
                <Text as="span" variant="light" color="brand.500" ml="5px" fontSize="md">Buy UST</Text>
              </Flex>
            </Link>

          </HStack>
        </Box>
        <Box flex="1" display={{ base: "none", lg: "block" }}>
          <Flex
            mb="8"
            flexDir={{ base: "column", sm: "column", md: "row" }}
            align="baseline"
          >
            <Heading color="#fff" size="lg" pr={{ md: "10px" }}>
              Provide
            </Heading>
          </Flex>
        </Box>
      </Flex>

      <Grid
        templateColumns="repeat(12, 1fr)"
        gridAutoRows={{ lg: "1fr" }}
        gap={{ base: 2, lg: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <Card h="full">
            <SwapForm />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <PoolItem
            label="WHALE-UST LP"
            asset="Terraswap"
            pairContract={whaleUstPair}
            lpTokenContract={whaleUstLpToken}
          />
        </GridItem>
      </Grid>

      <Flex gridGap="24">
        <Box flex="1"></Box>
        <Box flex="1"></Box>
      </Flex>
    </Box>
  );
};

export default Swap;
