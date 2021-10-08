import React, { FC } from "react";
import {
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import Card from "components/Card";
import PollVoteLogItem from "components/gov/PollVoteLogItem";

import { VoteType } from "types/poll";

const data = [
  {
    address: "terra1sdaga244824ju27s0gsospa01",
    voteType: VoteType.Yes,
  },
  {
    address: "terra1sdaga24482919sdjsjdospa0vz",
    voteType: VoteType.Yes,
  },
  {
    address: "terra1sdsgU244824ju27s0gsos556u",
    voteType: VoteType.No,
  },
  {
    address: "terra1sdaga24482919sdjsjrospa0vz",
    voteType: VoteType.Yes,
  },
];

type Props = {};

const PollVoteLog: FC<Props> = () => {
  return (
    <Card>
      <Text variant="light" mb="4">
        Vote log
      </Text>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>All</Tab>
          <Tab>Yes</Tab>
          <Tab>No</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {data.map((vote) => {
              return (
                <Box key={vote.address} mb="6" _last={{ mb: "0" }}>
                  <PollVoteLogItem vote={vote} />
                </Box>
              );
            })}
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default PollVoteLog;
