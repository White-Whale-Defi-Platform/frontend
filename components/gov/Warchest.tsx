import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fromTerraAmount } from '@arthuryeti/terra';
import { Flex, HStack,  Stack, Text, Center, Divider, Spacer } from '@chakra-ui/react';

import { useWarchest } from 'hooks/useWarchest';
import { useGovStaked, useGovTotalStaked } from 'modules/govern';

import UnstakeModal from 'components/gov/UnstakeModal';
import StakeModal from 'components/gov/StakeModal';
import Card from 'components/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

const Warchest = () => {
  const warchest = useWarchest();
  const totalStakedAmount = useGovTotalStaked();
  const stakedAmount = useGovStaked();
  // 7200_000 for some reason becomes 7_200_000_000_000 most likely the 6 decimal places needs to be accounted in the calcs
  // becuase total staked amount is also a value with 6 decimals taken into account so if you dont add the 6 zeros here
  // Your gonna end up with totalStakeAmount being a way bigger amount
  // Hope this hopes someone one day
  const govAprFormulaCalcThingy =
    (parseFloat(totalStakedAmount) + 19_200_000_000_000) /
      parseFloat(totalStakedAmount) -
    1;
  const govApr = (govAprFormulaCalcThingy * 100).toFixed(2);

  return (
    <Card noPadding h="full">
      <Stack direction="column" justify="space-between" h="full">
        <Stack direction={["column", null, "row"]} bg="blackAlpha.400" px="8" py="2" >
          <Stack direction={['column', 'row']} flex="2" spacing="8" align="center">
            <HStack spacing="2" >
              <Text>APR</Text>
              <Text color="brand.500" fontWeight="600">
                {govApr}%
              </Text>
            </HStack>
            <HStack spacing="2">
              <Text>Total Staked</Text>
              <Text color="brand.500" fontWeight="600">
                {fromTerraAmount(totalStakedAmount, '0.00a')} WHALE
              </Text>
            </HStack>
            <HStack spacing="2">
              <Text>My Staked</Text>
              <Text color="brand.500" fontWeight="600">
                {fromTerraAmount(stakedAmount, '0,0.00')} WHALE
              </Text>
            </HStack>
          </Stack>
          <Center h="14" px="6">
            <Divider
              orientation="vertical"
              borderColor="rgba(255, 255, 255, 0.1)"
            />
          </Center>
          <HStack flex="1" spacing="5" >
            <UnstakeModal />
            <StakeModal />
          </HStack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Warchest;
