import { fromTerraAmount, num, TxStep, useBalance } from "@arthuryeti/terra";
import { Box, Button, chakra, Flex, IconButton, Text } from "@chakra-ui/react";
import AmountInput from "components/AmountInput";
import DoubleArrowsIcon from "components/icons/DoubleArrowsIcon";
import LoadingForm from "components/LoadingForm";
import PendingForm from "components/PendingForm";
import SwapFormInfos from "components/swap/SwapFormInfos";
import SwapFormSuccess from "components/swap/SwapFormSuccess";
import useVaultSwap from 'components/swap/useVaultSwap';
import { DEFAULT_SLIPPAGE } from "constants/constants";
import useContracts from "hooks/useContracts";
import useDebounceValue from "hooks/useDebounceValue";
import { gt } from "libs/math";
import { toAmount } from "libs/parse";
import { useVault } from "modules/vault";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";




type Inputs = {
  token1: {
    asset: string;
    amount: string;
  };
  token2: {
    asset: string;
    amount: string;
  };
  slippage: string;
};

const SwapForm: FC = () => {
  const { whaleToken, ustVaultLpToken, ustVault } = useContracts();
  const [currentInput, setCurrentInput] = useState(null);
  const [reverseList, setReverseList] = useState(false);
  const { vUstValue, isFetching } = useVault({ contract: ustVault });


  const [token1List, setToken1List] = useState([
    {
      asset: "uusd",
      amount: undefined,
      selected: true
    },
    {
      asset: ustVaultLpToken,
      amount: undefined,
      selected: false
    }
  ])
  const [token2List, setToken2List] = useState([
    {
      asset: whaleToken,
      amount: undefined,
      selected: true
    }
  ])


  const { control, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: "uusd",
      },
      token2: {
        amount: undefined,
        asset: whaleToken,
      },
      slippage: String(DEFAULT_SLIPPAGE),
    },
  });
  const token1 = watch("token1");
  const token2 = watch("token2");
  const slippage = watch("slippage");



  const debouncedAmount1 = useDebounceValue(token1.amount, 200);

  const handleSuccess = useCallback(
    (txHash) => {
      setValue("token1.amount", "");
      setValue("token2.amount", "");
    },
    [setValue]
  );

  const handleError = useCallback((txHash) => {
    if (txHash) {
      // eslint-disable-next-line no-console
    }
  }, []);

  const state = useVaultSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    slippage,
    reverse: false,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  const error = useMemo(() => {

    if (!state.error) return

    const message: string = typeof state.error === 'string' ? state.error : ""

    // check if error message contain below words
    const insufficient = ["Overflow", "insufficient"];
    if (insufficient.some(condition => message.includes(condition)))
      return "Insufficient funds"

    return state.error

  }, [state.error])


  const handleToken1Change = (
    value: {
      asset: string;
      amount: string;
    },
    onChange: (value: {
      asset: string;
      amount: string;
    }) => void
  ) => {
    if (state?.txStep === TxStep.Failed)
      state.reset()

    if (value.amount?.length === 0) {
      setValue('token2', {
        ...token2,
        amount : ''
      });
    }

    setCurrentInput("token1");
    onChange(value);
  };

  const handleToken2Change = (
    value: {
      asset: string;
      amount: string;
    },
    onChange: (value: { asset: string; amount: string }) => void,
  ) => {
    if (state?.txStep === TxStep.Failed)
      state.reset()

    onChange(value);
  };

  const reverse = () => {
    setValue("token1", token2);
    setValue("token2", token1);
    setReverseList(!reverseList)
  };

  useEffect(() => {
    if (gt(state?.simulated?.amount, "0")) {
      const name = currentInput == "token2" ? "token1" : "token2";
      const token = currentInput == "token2" ? token1 : token2;

      const amount = token.asset === 'uusd' ?
        fromTerraAmount(num(state?.simulated?.amount).times(vUstValue).dp(0).toString(), "0.000000") :
        fromTerraAmount(state?.simulated?.amount, "0.000000")

      setValue(name, {
        ...token,
        amount
      });

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.simulated]);

  const submit = async () => {
    state?.swap();
  };

  if (state?.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (state?.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={state?.txHash} />;
  }

  if (state?.txStep == TxStep.Success) {
    return <SwapFormSuccess txInfo={state?.txInfo} onClick={state?.reset} />;
  }


  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box>
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              {...field}
              tokenList={reverseList ? token2List : token1List}
              setTokenList={reverseList ? setToken2List : setToken1List}
              onChange={(v) => handleToken1Change(v, field.onChange)}
            />
          )}
        />
      </Box>

      <Flex justify="center" align="center" color="brand.500" my="8">
        <IconButton
          aria-label="Reverse"
          variant="ghost"
          _focus={{ boxShadow: "none" }}
          _active={{ background: "transparent" }}
          _hover={{ background: "transparent", color: "white" }}
          icon={<DoubleArrowsIcon width="2rem" height="2rem" />}
          onClick={reverse}
        />
      </Flex>


      <Box width="full">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              isMaxDisabled
              tokenList={reverseList ? token1List : token2List}
              setTokenList={reverseList ? setToken1List : setToken2List}
              hideBalance
              isDisabled={true}
              {...field}
              onChange={(v) => handleToken2Change(v, field.onChange)}
            />
          )}
        />
      </Box>

      <Box mt="8">
        <SwapFormInfos
          token1={token1.asset}
          token2={token2.asset}
          fee={state?.fee}
          slippage={slippage}
          exchangeRate={state?.simulated?.price}
          minimumReceive={state?.minReceive}
          control={control}
        />
      </Box>

      {error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          <Text>{error}</Text>
        </Box>
      )}

      <Flex justify="center" mt="8">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={state?.txStep == TxStep.Estimating || isFetching}
          isDisabled={state?.txStep != TxStep.Ready}
          minW="64"
        >
          Swap
        </Button>
      </Flex>
    </chakra.form>
  );
};

export default SwapForm;
