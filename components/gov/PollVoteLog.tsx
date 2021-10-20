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

type Props = {
  voters: any;
};

const PollVoteLog: FC<Props> = ({ voters }) => {
  return (
    <Card>
      <Text variant="light" mb="4">
        Vote log
      </Text>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>All</Tab>
          {/* <Tab>Yes</Tab>
          <Tab>No</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            {voters.map((vote) => {
              return (
                <Box key={vote.voter} mb="6" _last={{ mb: "0" }}>
                  <PollVoteLogItem data={vote} />
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
