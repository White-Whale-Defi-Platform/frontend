import React from "react";
import { Box, Text } from "@chakra-ui/react";

const VotesChartBar = () => {
  return (
    <React.Fragment>
      <Box
        width="full"
        height="full"
        mr="17px"
        backgroundColor="brand.500"
        borderRadius="full"
        color="white"
        alignSelf="center"
        padding="2px 20px"
      >
        <Text>VoteBar</Text>
      </Box>
    </React.Fragment>
  );
};

export default VotesChartBar;
