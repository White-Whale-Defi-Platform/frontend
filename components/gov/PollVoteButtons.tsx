import React, { FC } from "react";
import { Button, HStack, forwardRef } from "@chakra-ui/react";

import ThumbsUpIcon from "components/icons/ThumbsUpIcon";
import ThumbsDownIcon from "components/icons/ThumbsDownIcon";
import { VoteType } from "types/poll";

type Props = {
  onChange: any;
  onBlur: any;
  value: VoteType;
};

const PollVoteButtons: FC<Props> = forwardRef(({ onChange, value }, ref) => {
  return (
    <HStack spacing="6" my="8" ref={ref}>
      <Button
        type="button"
        leftIcon={<ThumbsUpIcon width="0.75rem" height="0.75rem" />}
        variant={value === VoteType.Yes ? "primary" : "secondary"}
        size="lg"
        fontSize="sm"
        onClick={() => {
          onChange(VoteType.Yes);
        }}
      >
        Yes
      </Button>
      <Button
        type="button"
        leftIcon={<ThumbsDownIcon width="0.75rem" height="0.75rem" />}
        variant={value === VoteType.No ? "primary" : "secondary"}
        size="lg"
        fontSize="sm"
        onClick={() => {
          onChange(VoteType.No);
        }}
      >
        No
      </Button>
    </HStack>
  );
});

export default PollVoteButtons;
