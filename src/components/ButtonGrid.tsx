import React, { ChangeEvent, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { IonContent, IonHeader, IonButtons, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonLabel, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/react'

import {
    demicrofy,
    formatUST,
} from '@anchor-protocol/notation';
import { useDepositDialog } from '../components/dialogs/useDepositDialog';
import { useWithdrawDialog } from '../components/dialogs/useWithdrawDialog';



import {
    useEarnEpochStatesQuery
} from '@anchor-protocol/webapp-provider';
import { useBank } from '@terra-money/webapp-provider';
import { LCDClient } from '@terra-money/terra.js';
import { WhiteWhaleTokenBalances, computeTotalDeposit } from '../tx/withdraw-hook'
import { getDepositsInUST } from './ArbVault'
import { tequilaContractAddresses } from '../env';

interface PoolResponse {
    assets: Array<object>,
    total_deposits_in_ust: number,
    total_share: number
}

interface BalanceResponse {
    balance: number
}

export const getUserDepositsInUST = async (terra: LCDClient) : Promise<number> => {
    const contractAddress = tequilaContractAddresses.wwUSTVault;
    const response: PoolResponse = await terra.wasm.contractQuery(contractAddress, { pool: {} });

    const user_balance: BalanceResponse = await terra.wasm.contractQuery(tequilaContractAddresses.wwUSTLpToken, { balance: {address: "terra1lzquc5em3qrz6e2uyp9se60un4e7wnpf5yvz97"}});
    const user_ratio = user_balance.balance / response.total_share;

    return (user_ratio * response.total_deposits_in_ust)/1000000;
}


const ButtonGrid: React.FC = (props) => {

    const [currentDeposit, setDeposit] = React.useState(0.00)
    const [currentRewards, setRewards] = React.useState(0.00)
    const [userDeposit, setUserDeposit] = React.useState(0.00)
    const [currentAPY, setAPY] = React.useState(15.5)
    // Note: We can replace this by simply querying the bank module
    const { tokenBalances } = useBank<WhiteWhaleTokenBalances>();
    const { data } = useEarnEpochStatesQuery();

    const terra = new LCDClient({
        URL: 'https://tequila-lcd.terra.dev',
        chainID: 'tequila-0004',
    });
    getUserDepositsInUST(terra).then(deposit => {
        setUserDeposit(deposit);
    });

    // ---------------------------------------------
    // dialogs
    // ---------------------------------------------
    const [openDepositDialog, depositDialogElement] = useDepositDialog();

    const [openWithdrawDialog, withdrawDialogElement] = useWithdrawDialog();

    const openDeposit = useCallback(async () => {
        await openDepositDialog({});
    }, [openDepositDialog]);

    const openWithdraw = useCallback(async () => {
        await openWithdrawDialog({});
    }, [openWithdrawDialog]);
    return (<IonGrid>
        <IonRow>
            <IonItem>
                <IonLabel>APY: {currentAPY} %</IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>Your Deposit: {userDeposit} UST</IonLabel>
            </IonItem>
        </IonRow>
        <IonRow>
            <IonCol>
                <IonButton strong expand="block" color="secondary" onClick={openDeposit}>Deposit</IonButton>
            </IonCol>
            <IonCol>
                <IonButton strong expand="block" color="secondary" onClick={openWithdraw}>Withdraw</IonButton>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonItem>
                <IonLabel>Your Rewards: {currentDeposit} UST</IonLabel>
            </IonItem>
        </IonRow>
        <IonRow>
            <IonCol>
                <IonButton strong expand="block" color="tertiary">Claim</IonButton>
            </IonCol>
            <IonCol>
                <IonButton strong expand="block" color="tertiary">Compound</IonButton>
            </IonCol>
        </IonRow>
        {depositDialogElement}
        {withdrawDialogElement}
    </IonGrid>

    );
}
export default ButtonGrid
