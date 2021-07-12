import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { speedometer, wallet, logoUsd } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import {
  ExtensionNetworkOnlyWalletProvider,
  NetworkInfo,
  WalletProvider,
} from '@terra-money/wallet-provider';
import { ReadonlyWalletSession } from '@terra-dev/readonly-wallet';

import { GlobalStyle } from '@terra-dev/neumorphism-ui/themes/GlobalStyle';
import { darkTheme } from '@terra-dev/neumorphism-ui/themes/darkTheme';
import { lightTheme } from '@terra-dev/neumorphism-ui/themes/lightTheme';
import { ThemeProvider } from '@terra-dev/neumorphism-ui/themes/ThemeProvider';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: {
    name: 'testnet',
    chainID: 'tequila-0004',
    lcd: 'https://tequila-lcd.terra.dev',
  },
  1: {
    name: 'mainnet',
    chainID: 'columbus-4',
    lcd: 'https://lcd.terra.dev',
  },
};

const defaultNetwork = {
  chainID: 'columbus-4',
  fcd: 'https://fcd.terra.dev',
  lcd: 'https://lcd.terra.dev',
  name: 'mainnet',
  ws: 'wss://fcd.terra.dev',
};
const App: React.FC = () => (

  <IonApp>
    <ThemeProvider theme={lightTheme}>
    {/* /** Terra Station Wallet Address :: useWallet() */}
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
      connectorOpts={{
        bridge: 'https://tequila-walletconnect.terra.dev/',
      }}
    >
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={speedometer} />
            <IonLabel>Peg </IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={logoUsd} />
            <IonLabel>UST Whales</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={wallet} />
            <IonLabel>Vaults</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      
    </IonReactRouter>
    </WalletProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;
