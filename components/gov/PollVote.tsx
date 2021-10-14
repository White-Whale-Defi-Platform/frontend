import React, { FC } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import dayjs from "dayjs";

import { div, gt, max, sum } from "libs/math";
import { percent } from "libs/num";
import Card from "components/Card";
import PollProgress from "components/gov/PollProgress";
import VoteModal from "components/gov/VoteModal";
import StatWithIcon from "components/StatWithIcon";
import ThumbsUpIcon from "components/icons/ThumbsUpIcon";
import ThumbsDownIcon from "components/icons/ThumbsDownIcon";

import { Poll } from "types/poll";

type Props = {
  poll: Poll;
};

const PollVote: FC<Props> = ({ poll }) => {
  const { status, end_time } = poll;
  const formattedEndTime = dayjs().to(dayjs.unix(end_time), true);
  const parsed = parseVotes(poll);

  return (
    <Card noPadding>
      <Box p="6">
        <Text variant="light" mb="2">
          Vote
        </Text>
        <Box mb="4">
          <Text>
            <Text as="span" variant="light">
              Quorum
            </Text>
            <Text as="span" ml="2">
              5.00%
            </Text>
          </Text>
        </Box>
        <PollProgress voted={parsed.voted} status={status} />
        <Box mt="10" mb="2">
          <HStack justify="space-between">
            <Box>
              <HStack spacing="2" align="baseline">
                <Text fontSize="2xl" fontWeight="700">
                  {formattedEndTime}
                </Text>
                <Text variant="light">Left</Text>
              </HStack>
            </Box>
            <Box>
              <VoteModal />
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box p="6" py="8" borderTop="1px" borderTopColor="brand.800">
        <HStack justify="space-between">
          <Box>
            <Text variant="light">Total</Text>
            <Text fontSize="sm">{parsed.total} WHALE</Text>
          </Box>
          <HStack spacing="6">
            <StatWithIcon
              icon={<ThumbsUpIcon />}
              value={percent(parsed.yes)}
              label={`${parsed.yesCount} WHALE`}
            />
            <StatWithIcon
              icon={<ThumbsDownIcon />}
              color="red.500"
              bgColor="rgba(237, 116, 112, 0.4)"
              value={percent(parsed.no)}
              label={`${parsed.noCount} WHALE`}
            />
          </HStack>
        </HStack>
      </Box>
    </Card>
  );
};

export default PollVote;

export const parseVotes = (poll: Poll) => {
  const { yes_votes, no_votes, abstain_votes, total_balance_at_end_poll } =
    poll;

  const sumVotes = sum([yes_votes ?? 0, no_votes ?? 0, abstain_votes ?? 0]);
  const safeTotal = max([sumVotes, total_balance_at_end_poll ?? 0]);

  const votes = {
    yes: yes_votes ?? "0",
    no: no_votes ?? "0",
    abstain: abstain_votes ?? "0",
    total: total_balance_at_end_poll ? safeTotal : "0",
  };

  const total_share = "24185776762746";
  const { total } = votes;
  const yes = div(votes["yes"], gt(total, 0) ? total : total_share);
  const no = div(votes["no"], gt(total, 0) ? total : total_share);
  const abstain = div(votes["abstain"], gt(total, 0) ? total : total_share);
  const voted = sum([yes, no, abstain]);

  return {
    total,
    voted,
    yesCount: votes["yes"],
    yes: yes,
    noCount: votes["no"],
    no: no,
  };
};
