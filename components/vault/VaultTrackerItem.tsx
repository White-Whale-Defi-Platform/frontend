import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, HStack, Image, Link, Text, Tooltip, useMediaQuery, VStack, Box } from "@chakra-ui/react";
import { ArbTrades, Pair } from "libs/arbTrades";
import { truncate } from "libs/text";
import { useGetTokenInfo } from 'modules/pool';
import React, { FC } from "react";

type BuildRouteProps = {
  arbPairs: Pair[];
}

const ImageFallback = ({ symbol }) => {
  if (!symbol) return

  return (
    <Box bg="blackAlpha.900" px={2} py={.5} color='white' borderRadius={5}>
      <Text color="brand.500" textAlign="end" fontSize="xs" textTransform="capitalize"> {symbol} </Text>
    </Box>
  )
}

const GetTokenInfo = ({ contract }) => {
  const token: any = useGetTokenInfo(contract)
  return (<Text color="brand.500" textAlign="end" fontSize="xs" textTransform="capitalize"> {token?.data?.symbol}</Text>)
}


const BuildRoute: FC<BuildRouteProps> = ({ arbPairs = [] }) => {
  const [isMobile] = useMediaQuery('(max-width:480px)')
  return (
    <>
      {
        arbPairs.map((pair, index) => (
          <HStack mb="2" key={pair.dex + pair?.from?.symbol + Date.now() } >
            {!isMobile && (
              <>
                <Text size="lg" textTransform="capitalize"> {index + 1} </Text>
                <Text size="lg" textTransform="capitalize"> {pair.dex} </Text>
              </>
            )}

            {!pair?.from?.icon ? (
              <Box bg="blackAlpha.900" px={2} py={.5} color='white' borderRadius={5}>
                {pair?.from?.contract_addr ?
                  (<GetTokenInfo contract={pair?.from?.contract_addr} />):
                  (<Text color="brand.500" textAlign="end" fontSize="xs" textTransform="capitalize"> {pair?.from?.symbol}</Text>)
                }
              </Box>
            ) : (
              <Tooltip label={pair?.from?.symbol} borderRadius="unset" padding="1.5" bg="blackAlpha.900" fontSize="xs">
                <Image src={pair?.from?.icon} width="1.5rem" alt={pair?.from?.symbol} fallback={<ImageFallback symbol={pair?.from?.symbol} />} />
              </Tooltip>
            )}
            <Text size="lg" textTransform="capitalize">  → </Text>
            {!pair?.to?.icon ? (
              <Box bg="blackAlpha.900" px={2} py={.5} color='white' borderRadius={5}>
                {pair?.to?.contract_addr ?
                  (<GetTokenInfo contract={pair?.to?.contract_addr} />):
                  (<Text color="brand.500" textAlign="end" fontSize="xs" textTransform="capitalize"> {pair?.to?.symbol}</Text>)
                  }
              </Box>
            ) : (
              <Tooltip label={pair?.to?.symbol} borderRadius="unset" padding="1.5" bg="blackAlpha.900" fontSize="xs">
                <Image src={pair?.to?.icon} width="1.5rem" alt={pair?.to?.symbol} fallback={<ImageFallback symbol={pair?.to?.symbol} />} />
              </Tooltip>
            )}

          </HStack>
        ))
      }
    </>
  )
}

type Props = {
  trade: ArbTrades;
  isLast?: boolean;
}

const VaultTrackerItem: FC<Props> = ({ trade, isLast }) => {

  const { txhash, txHashLink, timestamp, vaultName, profit, arbPairs, } = trade
  const [isMobile] = useMediaQuery('(max-width:480px)')

  return (
    <Flex borderBottom={!isLast && "1px solid"} borderBottomColor={!isLast && "whiteAlpha.300"} pb="2" mb="5">
      <Link href={txHashLink} isExternal color="brand.500" flex={2} size="lg" textTransform="capitalize" mt="unset">
        {isMobile ? txhash.slice(-5) : truncate(txhash)} <ExternalLinkIcon mx='5px' mb="4px" />
      </Link>
      {!isMobile && (
        <>
          <Text color="#fff" flex={2} size="lg" textTransform="capitalize"> {timestamp} </Text>
          <Text color="#fff" flex={1} size="lg" textTransform="capitalize"> {vaultName} </Text>
        </>
      )}
      <Flex flexDirection="column" flex={2}> <BuildRoute arbPairs={arbPairs} /> </Flex>
      <Text color="#fff" flex={isMobile ? 'unset' : 1} textAlign="end" size="lg" textTransform="capitalize"> {profit} Ust</Text>
    </Flex>
  );
};

export default VaultTrackerItem;
