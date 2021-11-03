import React, { FC, useEffect, useCallback } from "react";
import {
  Button,
  HStack,
  Text,
  Box,
  chakra,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { fromTerraAmount, TxStep, useBalance } from "@arthuryeti/terra";

import { toAmount } from "libs/parse";
import { useFeeToString } from "hooks/useFeeToString";
import { useProvide, calculateTokenAmount } from "modules/pool";
import { gt } from "libs/math";
import useFinder from "hooks/useFinder";
import useDebounceValue from "hooks/useDebounceValue";

import PlusCircleIcon from "components/icons/PlusCircleIcon";
import InlineStat from "components/InlineStat";
import AmountInput from "components/AmountInput";
import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";

type Inputs = {
  token1: {
    asset: string;
    amount: string;
  };
  token2: {
    asset: string;
    amount: string;
  };
};

type Props = {
  pairContract: string;
  pool: any;
  onClose: () => void;
};

const ProvideForm: FC<Props> = ({ pairContract, pool, onClose }) => {
  const token1Balance = useBalance(pool.token1);
  const token2Balance = useBalance(pool.token2);
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch, setValue, formState } = useForm<Inputs>(
    {
      defaultValues: {
        token1: {
          amount: undefined,
          asset: pool.token1,
        },
        token2: {
          amount: undefined,
          asset: pool.token2,
        },
      },
    }
  );
  const token1 = watch("token1");
  const token2 = watch("token2");

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);
  const debouncedAmount2 = useDebounceValue(token2.amount, 200);

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("pool");
      queryClient.invalidateQueries("staked");
      queryClient.invalidateQueries("stakerInfo");
      onClose();
    },
    [onClose, queryClient]
  );

  const handleError = useCallback(
    (txHash) => {
      onClose();
    },
    [onClose]
  );

  const provideState = useProvide({
    contract: pairContract,
    pool: pool,
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  useEffect(() => {
    // @ts-expect-error
    if (formState.name == "token1") {
      const formattedToken2Balance = fromTerraAmount(token2Balance, "0.000000");
      const token2amount = calculateTokenAmount(
        pool,
        token1.asset,
        token1.amount
      );
      const potentialToken1amount = calculateTokenAmount(
        pool,
        token2.asset,
        formattedToken2Balance
      );

      if (gt(token2amount, formattedToken2Balance)) {
        setValue("token2.amount", formattedToken2Balance);
        setValue("token1.amount", potentialToken1amount);
      } else {
        setValue("token2.amount", token2amount);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1.amount]);

  useEffect(() => {
    // @ts-expect-error
    if (formState.name == "token2") {
      const formattedToken1Balance = fromTerraAmount(token1Balance, "0.000000");
      const token1amount = calculateTokenAmount(
        pool,
        token2.asset,
        token2.amount
      );
      const potentialToken2amount = calculateTokenAmount(
        pool,
        token1.asset,
        formattedToken1Balance
      );

      if (gt(token1amount, formattedToken1Balance)) {
        setValue("token1.amount", formattedToken1Balance);
        setValue("token2.amount", potentialToken2amount);
      } else {
        setValue("token1.amount", token1amount);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token2.amount]);

  const submit = async () => {
    provideState.provideLiquidity();
  };

  // @ts-expect-error
  const feeString = useFeeToString(provideState.fee);

  if (provideState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (provideState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={provideState.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full" mt="8">
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      <Flex justify="center" color="brand.600" my="6">
        <PlusCircleIcon />
      </Flex>

      <Box width="full">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      <Box mt="4">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
      </Box>

      {provideState.error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          <Text>{provideState.error}</Text>
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
          isLoading={provideState.txStep == TxStep.Estimating}
          isDisabled={provideState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default ProvideForm;
