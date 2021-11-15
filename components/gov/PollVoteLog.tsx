import React, { FC } from "react";
import {
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Flex,
  HStack,
  Divider,
} from "@chakra-ui/react";

import Card from "components/Card";
import PollVoteLogItem from "components/gov/PollVoteLogItem";
import Voters from "./Voters";

type Props = {
  voters: any;
};

const PollVoteLog: FC<Props> = ({ voters }) => {
  return (
    <Card>
      <Flex direction="column" justify="space-between" h="full">
        <HStack>
          <Box flex="1">
            <Flex justify="space-between">
              <Text variant="light" mb="4">
                Voter
              </Text>
              <Text variant="light" mb="4">
                Vote
              </Text>
              <Text variant="light" mb="4">
                Amount
              </Text>
            </Flex>
          </Box>
        </HStack>
        <Voters />

        {/* <Tabs variant="soft-rounded">
        <TabList>
          <Tab>All</Tab>
          <Tab>Yes</Tab>
          <Tab>No</Tab>
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
      </Tabs> */}
      </Flex>
    </Card>
  );
};

export default PollVoteLog;
