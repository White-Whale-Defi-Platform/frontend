import React, { FC, useCallback } from "react";
import { Button, HStack, Box, chakra, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { TxStep, useTerraWebapp, fromTerraAmount, num } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useGovStaked, useGovStaker, useUnstake } from "modules/govern";
import { toAmount } from "libs/parse";
import useContracts from "hooks/useContracts";
import useFeeToString from "hooks/useFeeToString";
import { usePoll } from "modules/govern";

import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";

type Props = {
  onClose: () => void;
};

type IFormInputs = {
  token: {
    asset: string;
    amount: string;
  };
};

const UnstakeForm: FC<Props> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { whaleToken, gov } = useContracts();
  const stakedAmount = useGovStaked();
  const stakerInfo = useGovStaker();
  const lockedInPolls = stakerInfo && stakerInfo.locked_balance.map(poll => parseFloat(poll[1].balance)).reduce((prevValue, currentValue) => prevValue + currentValue, 0)
  const availableToWithdraw = parseFloat(stakedAmount) - lockedInPolls

  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: whaleToken,
      },
    },
  });

  const token = watch("token");

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("staker");
    onClose();
  }, [onClose, queryClient]);

  const unstakeState = useUnstake({
    govContract: gov,
    amount: toAmount(token.amount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    unstakeState.deposit();
  };

  const feeString = useFeeToString(unstakeState.fee);

  if (unstakeState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (unstakeState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={unstakeState.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full" mt="8">
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput availableToWithdraw={availableToWithdraw} initialBalance={stakedAmount} showLockedInPolls={true} {...field} />
          )}
        />
      </Box>

      <Box mt="6">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
      </Box>

      {unstakeState.error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          {/* <Text>{unstakeState.error}</Text> */}
          <Text>
            Available to withdraw:  {fromTerraAmount(availableToWithdraw, "0,0.000000")}
          </Text>
          <Text>
            Locked in poll:  {fromTerraAmount(lockedInPolls, "0,0.000000")}
          </Text>
        </Box>
      )}

      <HStack spacing="6" width="full" mt="8">
        <Button variant="secondary" size="lg" flex="1" onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          flex="1"
          isLoading={unstakeState.txStep == TxStep.Estimating}
          disabled={unstakeState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default UnstakeForm;
