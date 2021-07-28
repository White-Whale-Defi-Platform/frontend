import React from 'react'
import { IonCard, IonItem, IonLabel, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react'
import ReactSpeedometer from 'react-d3-speedometer'
import ButtonGrid from '../components/ButtonGrid'
import {
    demicrofy,
    formatUST
} from '@anchor-protocol/notation';
import { LCDClient, Coin } from '@terra-money/terra.js';
import { UST, uUST } from '@anchor-protocol/types';

interface ArbVaultProps {
    vaultName: string;
}
function ArbVault({ vaultName }: ArbVaultProps) {
    const [currentUSTPrice, setCurrentUSTPrice] = React.useState(1.000)
    const [labelTextColour, setTextColour] = React.useState('#FFFFFF')
    const terra = new LCDClient({
        URL: 'https://tequila-lcd.terra.dev',
        chainID: 'tequila-0004',
    });

    // Theming 
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => updateStyles(mediaQuery.matches))
    // Based on the query, determine the text colour. 
    function updateStyles(shouldUpdate) {
        shouldUpdate ? setTextColour('#FFFFFF') : setTextColour('#000000')
    }
    // callAPI is an abstraction used to make an API and return its JSON response
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
    // fetchData is used to return a precise UST-USD coin price from the 1m chart.
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


    // add side effect to component for dummy UST Price
    React.useEffect(() => {
        // create interval
        const interval = setInterval(
            // set number every 3s between 1.20 and 0.80 UST
            () => {

                if (vaultName == 'UST') {
                    fetchData().then((chartData) => {
                        setCurrentUSTPrice(parseFloat(chartData.price[chartData.price.length - 1].toPrecision(4)))
                    }).catch((err) => {
                        console.log("Found issue with price grab" + err)
                        setCurrentUSTPrice(parseFloat((Math.random() * (0.90 - 1.10) + 1.10).toPrecision(4)))
                    })
                }
                else {
                    // In the case of KRW, we are using a value of 1000 KRW rather than just 1 unit of KRW due to its exchange rate.
                    let coin_to_check = new Coin(`u${vaultName.toLowerCase()}`, vaultName == "KRW" ? '1000000000' : '1000000');
                    terra.market.swapRate(coin_to_check, 'uusd').then(c => {
                        console.log(`${coin_to_check.toString()} can be swapped for ${c.toString()}`);
                        setCurrentUSTPrice(parseFloat(formatUST(demicrofy(c.toData().amount as uUST))))
                    });
                }
            },
            5000
        )

        // clean up interval on unmount
        return () => {
            clearInterval(interval)
        }
    })
    return (<IonCard>
        <IonCardHeader>
            <IonCardTitle>{`${vaultName} Arb Vault`}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            {
                /* This Grid is responsible for ensuring the speedometer remains centered within the component*/
            }
            <IonGrid>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol size="auto"><ReactSpeedometer minValue={0.95} maxValue={1.05} textColor={labelTextColour} value={currentUSTPrice} height={160} needleHeightRatio={0.7} segments={10} maxSegmentLabels={10} // We set to text to empty as we use custom text components below
                        currentValueText={``} valueTextFontSize={'2px'} valueTextFontWeight={'0'} paddingHorizontal={27} paddingVertical={5} needleTransitionDuration={1000} segmentColors={['#03DF04', '#03DF04', '#A0F9A0', '#A0F9A0', '#FFFFFE', '#FFFFFE', '#A0F9A0', '#A0F9A0', '#03DF04', '#03DF04']} />
                        <IonItem className="value-text">

                            <IonLabel className="ion-text-center"><IonIcon src='/assets/ust.svg'></IonIcon>{vaultName}:</IonLabel>
                        </IonItem>
                        <IonItem className="value-text">
                            <IonLabel className="ion-text-center">$ {currentUSTPrice}</IonLabel>
                        </IonItem>
                        {
                            /*-- This is another Buttons and Label Grid. Inside the first one, the intention here is to be able to have columns which are perfectly split from teh speedometer but still all centered --*/
                        }
                        {
                            /* ButtonGrid contains the elements related to interacting with a Vault */
                        }
                        <ButtonGrid></ButtonGrid>

                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </IonGrid>
        </IonCardContent>
    </IonCard>);
}

export default ArbVault
