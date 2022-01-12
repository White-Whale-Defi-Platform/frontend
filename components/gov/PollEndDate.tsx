import React, { FC } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import dayjs from "dayjs";

import { div, gt, max, sum } from "libs/math";

import Card from "components/Card";
import PollProgress from "components/gov/PollProgress";
import VoteModal from "components/gov/VoteModal";
import StatWithIcon from "components/StatWithIcon";
import ThumbsUpIcon from "components/icons/ThumbsUpIcon";
import ThumbsDownIcon from "components/icons/ThumbsDownIcon";

import { Poll } from "types/poll";
import { formatRate } from "libs/parse";
import { usePoll, useVoteAvailable } from "modules/govern";

type Props = {
  poll: any;
};

const PollEndDate: FC<Props> = ({ poll }) => {
  const {
    data: { id, status, endsIn },
  } = poll;
  const now = dayjs();
  const details = usePoll(id);
  const endDate = dayjs(details.endsIn);
  const distance = endDate.diff(now, "s");
  const formattedEndAt = endDate.format("LLL z");
  const isEnded = now.isSameOrAfter(endDate);

  const days = Math.floor(distance / (60 * 60 * 24));
  const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((distance % (60 * 60)) / 60);

  if (isEnded) {
    return (
      <HStack spacing="2" align="baseline">
        <Text fontSize="2xl" fontWeight="700">
          Already Ended
        </Text>
      </HStack>
    );
  }

  return (
    <HStack spacing="2" align="baseline">
      <Text fontSize="3xl" fontWeight="700">
        {days}d {hours}h {minutes}m
      </Text>
      <Text variant="light">Left</Text>
    </HStack>
  );
};

export default PollEndDate;
