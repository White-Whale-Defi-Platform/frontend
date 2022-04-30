import React, { useMemo } from 'react'
import Card from "components/Card";
import { Box, Flex, HStack, VStack, Stack, Text, Image, Tooltip as ChakraToolTip, Tag, Link } from "@chakra-ui/react";
import { truncate } from 'libs/text';
import dayjs from 'dayjs';
import { fromTerraAmount, num } from '@arthuryeti/terra';
import { useTokenInfo } from '@arthuryeti/terraswap';
import { useMediaQuery } from '@chakra-ui/react';
import { Show, Hide } from '@chakra-ui/react'
import useBuyBack from 'modules/pool/hooks/useBuyBack';


const ImageFallback = ({ symbol }) => {
  if (!symbol) return

  return (
    <Text fontSize="xs" > {symbol} </Text>
  )
}



const BuyBackCard = () => {
  const [isMobile] = useMediaQuery('(max-width:480px)')
  const { data = [], totalBuy } = useBuyBack()
  const { getIcon } = useTokenInfo();

  const icon = (asset) => {
    try { return getIcon(asset) }
    catch (err) { return '' }
  }

  const buyBack = useMemo(() => {
    
    return data.map(({ txhash, timestamp, offerAmount, returnAmount, offerAsset, askAsset }) => {
      return ({
        txhash: truncate(txhash, isMobile ? [2, 2] : [4, 4]),
        txHashLink: `https://finder.terra.money/mainnet/tx/${txhash}`,
        timestamp: dayjs(timestamp).format('DD/MM/YYYY'),
        offerAmount: fromTerraAmount(offerAmount),
        returnAmount: fromTerraAmount(returnAmount),
        offerAsset: icon(offerAsset),
        askAsset: icon(askAsset)
      })
    })
  }, [data])

  return (
    <Card>
      <VStack spacing="4" mb={{ base: "4", lg: "0" }} width="100%">
        <VStack mb={2}>
          <Text color="#fff" fontSize="2xl" fontWeight="700" >
            Whale Buy Back
          </Text>
          <Text color="brand.500" fontSize="xs">
            {totalBuy} Whale bought so far
          </Text>
        </VStack>

        <Flex mb="5" justifyContent="space-between" width="100%">
          <Text variant="light" flex={1} size="lg" textTransform="capitalize"> TxHash </Text>
          <Show above='sm'>
            <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Timestamp </Text>
          </Show>
          <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Sold </Text>
          <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Bought </Text>
        </Flex>

        {
          buyBack.map(({ txhash, txHashLink, timestamp, offerAmount, returnAmount, offerAsset, askAsset }) => (
            <Flex key={txhash} mb="5" justifyContent="space-between" width="100%" borderBottom="1px solid" borderBottomColor="whiteAlpha.300" py={2}>
              <Text flex={1} fontSize="sm" >
                <Link href={txHashLink} isExternal color="brand.500" >
                  {txhash}
                </Link>

              </Text>
              <Show above='sm'>
                <Text flex={1} fontSize="sm" > {timestamp} </Text>
              </Show>
              <HStack flex={1}>
                <Image src={offerAsset} width="1.5rem" alt={"vUST"} fallback={<ImageFallback symbol="vUST" />} />
                <Text flex={1} fontSize="sm" > {offerAmount} </Text>
              </HStack>
              <HStack flex={1}>
                <Image src={askAsset} width="1.5rem" alt={"vUST"} fallback={<ImageFallback symbol="Whale" />}/>
                <Text flex={1} fontSize="sm" > {returnAmount} </Text>
              </HStack>
            </Flex>
          ))
        }




      </VStack>
    </Card>
  )
}

export default BuyBackCard