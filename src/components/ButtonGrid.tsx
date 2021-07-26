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
import { WhiteWhaleTokenBalances, computeTotalDeposit } from '../tx/withdraw-hook'


const ButtonGrid: React.FC = (props) => {

    const [currentDeposit, setDeposit] = React.useState(0.00)
    const [currentRewards, setRewards] = React.useState(0.00)
    const [currentAPY, setAPY] = React.useState(15.5)
    // Note: We can replace this by simply querying the bank module
    const { tokenBalances } = useBank<WhiteWhaleTokenBalances>();
    const { data } = useEarnEpochStatesQuery();

    const { totalDeposit } = useMemo(() => {
        return {
            totalDeposit: computeTotalDeposit(
                tokenBalances.wwUST,
                data?.moneyMarketEpochState,
            ),
        };
    }, [data?.moneyMarketEpochState, tokenBalances.wwUST]);

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
                <IonLabel>Your Deposit: {formatUST(demicrofy(totalDeposit))} UST</IonLabel>
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
