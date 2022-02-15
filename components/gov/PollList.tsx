import React, { FC } from 'react';
import { GridItem } from '@chakra-ui/react';

import PollItem from 'components/gov/PollItem';
import { usePolls } from 'modules/govern';

type Props = {
  status?: string;
};

const PollList: FC<Props> = ({ status }) => {
  const { data, isLoading } = usePolls(status);

  if (isLoading || !data) {
    return null;
  }

  const { polls } = data;

  return (
    <>
      {polls.map((poll) => (
        <GridItem key={poll.id} colSpan={[11, 12, 6]}>
          <PollItem poll={poll} />
        </GridItem>
      ))}
    </>
  );
};

export default PollList;
