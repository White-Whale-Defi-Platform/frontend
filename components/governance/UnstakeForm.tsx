import React, { FC, useCallback } from "react";
import { Button, HStack, Box, chakra } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useTerraWebapp } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useGovStaked, useUnstake } from "modules/govern";
import { toAmount } from "libs/parse";
import useFeeToString from "hooks/useFeeToString";
import contracts from "constants/contracts.json";

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
  const stakedAmount = useGovStaked();
  const {
    network: { name },
  } = useTerraWebapp();

  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: contracts[name].whaleToken,
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
    govContract: contracts[name].gov,
    amount: toAmount(token.amount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    unstakeState.deposit();
  };

  const feeString = useFeeToString(unstakeState.fee);

  if (unstakeState.isBroadcasting) {
    return <LoadingForm />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full" mt="8">
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput initialBalance={stakedAmount} {...field} />
          )}
        />
      </Box>

      <Box mt="6">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
      </Box>

      <HStack spacing="6" width="full" mt="8">
        <Button variant="secondary" size="lg" flex="1" onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          flex="1"
          isDisabled={!unstakeState.isReady}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default UnstakeForm;
