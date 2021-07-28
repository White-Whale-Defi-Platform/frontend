//  Copyright: (c) 2021, 0xFable, WhiteWhale Team
//  The MIT License

//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/react'
import { Header } from '../components/Header'
import './Tab1.css'
import ArbVault from '../components/ArbVault'


const Tab1: React.FC = () => {

  const vaults = ['UST', 'EUR', 'KRW']
  const vault_components = vaults.map((vault) =>
    <IonCol>
      {/* Each ArbVault is a component which contains a Peg speedometer, price and buttons for interacting with the vault */}
      <ArbVault vaultName={vault}></ArbVault>
    </IonCol>
  )
  return (

    <IonPage>
      <IonHeader>
        {/* Header contains the Mobile/Desktop changing header with wallet integration */}
        <Header />

      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {vault_components}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
