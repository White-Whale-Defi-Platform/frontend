import React, { FC } from "react";
import { Grid } from "@chakra-ui/react";

import PollList from "components/gov/PollList";
import Card from "components/Card";

const Polls: FC = () => {
  return (
    <Card mt="6">
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        <PollList />
      </Grid>
      {/* <Tabs variant="soft-rounded" colorScheme="green"> */}
      {/* <TabList>
          <Tab>All</Tab>
          <Tab>In Progress</Tab>
          <Tab>Passed</Tab>
          <Tab>Executed</Tab>
          <Tab>Rejected</Tab>
        </TabList> */}
      {/* <TabPanels>
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
              <PollList status={PollStatus.Executed} />
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <PollList status={PollStatus.Rejected} />
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </Card>
  );
};

export default Polls;
