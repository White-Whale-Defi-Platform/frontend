import React, { FC } from "react";
import { Box, Tabs } from "@chakra-ui/react";

import Card from "components/Card";
import PollVoteLogItem from "components/gov/PollVoteLogItem";

type Props = {
  voters: any;
};

const PollVoteLog: FC<Props> = ({ voters }) => {
  return (
    <Card>
      <Tabs variant="soft-rounded">
        {voters.map((vote) => {
          return (
            <Box key={vote.voter} mb="6" _last={{ mb: "0" }}>
              <PollVoteLogItem data={vote} />
            </Box>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default PollVoteLog;
