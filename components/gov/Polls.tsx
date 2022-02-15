import React, { FC } from 'react';
import { Grid } from '@chakra-ui/react';

import PollList from 'components/gov/PollList';
import Card from 'components/Card';

const Polls: FC = () => (
  <Card mt="6">
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <PollList />
    </Grid>
  </Card>
);

export default Polls;
