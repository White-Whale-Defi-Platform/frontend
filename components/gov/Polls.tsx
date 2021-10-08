import React, { FC } from "react";
import {
  Box,
  Heading,
  Grid,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import PollList from "components/gov/PollList";
import { PollStatus } from "types/poll";

const Polls: FC = () => {
  return (
    <Box mt="6" mb="24">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>All</Tab>
          <Tab>In Progress</Tab>
          <Tab>Passed</Tab>
          <Tab>Rejected</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <PollList />
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <PollList status={PollStatus.InProgress} />
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <PollList status={PollStatus.Passed} />
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <PollList status={PollStatus.Rejected} />
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Polls;
