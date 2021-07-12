import React, { useState, useEffect } from 'react'
import { IonContent, IonHeader, IonButtons, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonLabel, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/react'
import { wifi, wine, warning } from 'ionicons/icons'

import GaugeChart from 'react-gauge-chart'
import {Header } from '../components/Header'
import { WalletSelector } from '../components/Header/WalletSelector';

import './Tab1.css'
// import the component
import ReactSpeedometer from 'react-d3-speedometer'
const Tab1: React.FC = () => {
  const [currentUSTPrice, setCurrentUSTPrice] = React.useState(0.80)
  // Replace these states values with smart contract function calls
  const [currentDeposit, setDeposit] = React.useState(0.00)
  const [currentRewards, setRewards] = React.useState(0.00)
  const [currentAPY, setAPY] = React.useState(37.6)
  const callAPI = async (url) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }
    return response.json()
  }

  const fetchData = async () => {
    const data = { index: [], price: [], volumes: [] }
    const result = await callAPI('https://api.coingecko.com/api/v3/coins/terrausd/market_chart?vs_currency=usd&days=1&interval=1m')
    for (const item of result.prices) {
      data.index.push(item[0])
      data.price.push(item[1])
    }
    for (const item of result.total_volumes) data.volumes.push(item[1])
    return data
  }

  // // add side effect to component for dummy UST Price
  // React.useEffect(() => {
  //   // create interval
  //   const interval = setInterval(
  //     // set number every 5s between 1.20 and 0.80 UST
  //     () => setCurrentUSTPrice(parseFloat((Math.random() * (0.80 - 1.20) + 1.20).toPrecision(4))),
  //     5000
  //   )

  //   // clean up interval on unmount
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  // add side effect to component for dummy UST Price
  React.useEffect(() => {
    // create interval
    const interval = setInterval(
      // set number every 3s between 1.20 and 0.80 UST
      () => {
        fetchData().then((chartData) => {
          setCurrentUSTPrice(chartData.price[chartData.price.length - 1].toPrecision(4))
        }).catch((err) => {
          console.log("Found issue with price grab" + err)
          setCurrentUSTPrice(parseFloat((Math.random() * (0.80 - 1.20) + 1.20).toPrecision(4)))
        })
      },
      3000
    )

    // clean up interval on unmount
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>White Whale - Info</IonTitle>
          <IonButtons slot="end">
          <WalletSelector />
          </IonButtons>
        </IonToolbar>
        <Header/>

      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">White Whale - Info</IonTitle>
          </IonToolbar>

        </IonHeader>

        <IonCard>
          <IonGrid>
            {/* <IonRow>
              <IonCol> <IonCard>
                <IonItem>
                  <IonIcon icon={pin} slot="start" />
                  <IonLabel>Luna Price: {5.57}</IonLabel>
                  <IonButton fill="outline" slot="end">View</IonButton>
                </IonItem>
              </IonCard>
              </IonCol>
              <IonCol> <IonCard>
                <IonItem>
                  <IonIcon icon={pin} slot="start" />
                  <IonLabel>Anchor Price: {2.1}</IonLabel>
                  <IonButton fill="outline" slot="end">View</IonButton>
                </IonItem>
              </IonCard>
              </IonCol>
            </IonRow> */}
            <IonRow>
              <IonCol></IonCol>
              <IonCol size="auto" color='light'>UST Price Peg:<ReactSpeedometer
                minValue={0.80}
                maxValue={1.20}
                textColor={'white'}
                value={currentUSTPrice}
                needleTransitionDuration={1000}
                customSegmentStops={[0.80, 0.85, 0.90, 0.95, 1.05, 1.10, 1.15, 1.20]}
                segmentColors={['firebrick', 'tomato', 'gold', 'limegreen', 'gold', 'tomato', 'firebrick']}
              />
                {/*-- Item Labels --*/}
                <IonItem>
                  <IonLabel>APY: {currentAPY} %</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Your Deposit: {currentDeposit} UST</IonLabel>
                </IonItem>
                <IonButton expand="block" color="secondary">Deposit / Withdrawl</IonButton>
                <IonItem>
                  <IonLabel>Your Rewards: {currentRewards} UST</IonLabel>
                </IonItem>
                <IonButton expand="block" color="tertiary">Claim Rewards</IonButton></IonCol>

              <IonCol></IonCol>
            </IonRow>
          </IonGrid>

          <IonCardHeader>
            <IonCardSubtitle>UST Price Peg Guage</IonCardSubtitle>
            <IonCardTitle>Terra and UST Info Links</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Provided with this guage are a few helpful links
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonItem href="https://station.terra.money/" className="ion-activated">
            <IonIcon icon={wifi} slot="start" />
            <IonLabel>TerraStation</IonLabel>
          </IonItem>

          <IonItem href="https://app.anchorprotocol.com">
            <IonIcon icon={wine} slot="start" />
            <IonLabel>Anchor Protocol</IonLabel>
          </IonItem>

          <IonItem href="https://terra.mirror.finance/" className="ion-activated">
            <IonIcon icon={warning} slot="start" />
            <IonLabel>Mirror Protocol</IonLabel>
          </IonItem>

        </IonCard>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
