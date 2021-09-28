import React, { FC, useCallback, useEffect } from "react";
import { Box, HStack, chakra, Button } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useFeeToString } from "@arthuryeti/terra";

import { toAmount } from "libs/parse";
import { gt } from "libs/math";
import { useDeposit } from "modules/vault";
import useDebounceValue from "hooks/useDebounceValue";
import { useBalance } from "hooks/useBalance";

import AmountInput from "components/AmountInput";
import LoadingForm from "components/LoadingForm";
import InlineStat from "components/InlineStat";

type IFormInputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  token: string;
  vault: any;
  onClose: () => void;
};

const DepositForm: FC<Props> = ({ token: tokenContract, vault, onClose }) => {
  const lpTokenBalance = useBalance(tokenContract);
  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: tokenContract ?? "uluna",
      },
    },
  });
  const token = watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 500);

  const handleSuccess = useCallback(() => {
    onClose();
  }, [onClose]);

  const depositState = useDeposit({
    token: token.asset,
    contract: vault.contract_addr,
    amount: toAmount(debouncedAmount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    depositState.deposit();
  };

  const feeString = useFeeToString(depositState.fee);

  useEffect(() => {
    if (gt(lpTokenBalance, 0)) {
      const value = depositState.getFeeForMax(lpTokenBalance);
      console.log(value);
    }
  }, [lpTokenBalance, depositState]);

  if (depositState.isLoading) {
    return <LoadingForm />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full">
        <Controller
          name="token"
          control={control}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      {depositState.isReady && (
        <Box mt="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
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
          isDisabled={!depositState.isReady}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default DepositForm;
