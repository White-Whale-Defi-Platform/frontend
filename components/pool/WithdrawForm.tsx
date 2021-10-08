import React, { FC, useCallback } from "react";
import {
  Button,
  HStack,
  Box,
  Image,
  chakra,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { num, TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";
import { useWithdraw } from "modules/pool";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import { ONE_TOKEN } from "constants/constants";

type Inputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  pairContract: string;
  lpTokenContract: string;
  onClose: () => void;
};

const WithdrawForm: FC<Props> = ({
  pairContract,
  lpTokenContract,
  onClose,
}) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const queryClient = useQueryClient();
  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: lpTokenContract,
      },
    },
  });
  const token = watch("token");

  const debouncedAmount1 = useDebounceValue(token.amount, 200);

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("pool");
      queryClient.invalidateQueries("staked");
      onClose();
    },
    [onClose, queryClient]
  );

  const withdrawState = useWithdraw({
    pairContract,
    lpTokenContract,
    amount: toAmount(debouncedAmount1),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    withdrawState.withdraw();
  };

  const feeString = useFeeToString(withdrawState.fee);

  const renderToken = (token) => {
    const amount = num(withdrawState.tokenAmounts[token])
      .div(ONE_TOKEN)
      .toFormat();

    return (
      <Flex justify="space-between">
        <HStack>
          <Image
            src={getIcon(token)}
            width="1.5rem"
            height="1.5rem"
            alt="Logo"
          />
          <Text variant="light" fontWeight="500">
            {getSymbol(token)}
          </Text>
        </HStack>
        <Text>{amount}</Text>
      </Flex>
    );
  };

  if (withdrawState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (withdrawState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={withdrawState.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full" mt="8">
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      {withdrawState.tokenAmounts && (
        <Box py="3" my="6" bg="blackAlpha.300" px="4" borderRadius="2xl">
          <Box mb="4">{renderToken(withdrawState.token1)}</Box>
          {renderToken(withdrawState.token2)}
        </Box>
      )}

      <Box mt="4">
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
          isLoading={withdrawState.txStep == TxStep.Estimating}
          isDisabled={withdrawState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default WithdrawForm;
