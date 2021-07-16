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
import { captureException } from '@sentry/react';

import { IonReactRouter } from '@ionic/react-router';
import { speedometer, wallet, logoUsd, business } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import {
  ExtensionNetworkOnlyWalletProvider,
  NetworkInfo,
  WalletProvider,
} from '@terra-money/wallet-provider';
import {
  BankProvider as WebappBankProvider,
  CW20Contract,
  TerraWebappProvider,
  defaultMantleFetch,
} from '@terra-money/webapp-provider';
import { ReadonlyWalletSession } from '@terra-dev/readonly-wallet';

import { GlobalStyle } from '@terra-dev/neumorphism-ui/themes/GlobalStyle';
import { darkTheme } from '@terra-dev/neumorphism-ui/themes/darkTheme';
import { lightTheme } from '@terra-dev/neumorphism-ui/themes/lightTheme';
import { ThemeProvider } from '@terra-dev/neumorphism-ui/themes/ThemeProvider';
import { ADDRESSES, defaultNetwork, onProduction } from './env';
import {
  ANCHOR_TX_REFETCH_MAP,
  AnchorWebappProvider,
} from '@anchor-protocol/webapp-provider';

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
//TODO: Add the Terra webapp provider components so the app can gather the token balances
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

const cw20TokenContracts: Record<string, Record<string, CW20Contract>> = {
  mainnet: {
    uaUST: {
      contractAddress: ADDRESSES.mainnet.cw20.aUST,
    },
    ubLuna: {
      contractAddress: ADDRESSES.mainnet.cw20.bLuna,
    },
    uANC: {
      contractAddress: ADDRESSES.mainnet.cw20.ANC,
    },
    uAncUstLP: {
      contractAddress: ADDRESSES.mainnet.cw20.AncUstLP,
    },
    ubLunaLunaLP: {
      contractAddress: ADDRESSES.mainnet.cw20.bLunaLunaLP,
    },
  },
  testnet: {
    uaUST: {
      contractAddress: ADDRESSES.testnet.cw20.aUST,
    },
    ubLuna: {
      contractAddress: ADDRESSES.testnet.cw20.bLuna,
    },
    uANC: {
      contractAddress: ADDRESSES.testnet.cw20.ANC,
    },
    uAncUstLP: {
      contractAddress: ADDRESSES.testnet.cw20.AncUstLP,
    },
    ubLunaLunaLP: {
      contractAddress: ADDRESSES.testnet.cw20.bLunaLunaLP,
    },
  },
};

const maxCapTokenDenoms: Record<string, string> = {
  maxTaxUUSD: 'uusd',
};
const errorReporter = null;

// const [openReadonlyWalletSelector, readonlyWalletSelectorElement] =
//     useReadonlyWalletDialog();
// const createReadonlyWalletSession = useCallback(
//   (networks: NetworkInfo[]): Promise<ReadonlyWalletSession | null> => {
//     return openReadonlyWalletSelector({
//       networks,
//     });
//   },
//   [openReadonlyWalletSelector],
// );
const App: React.FC = () => (


  <IonApp>
    <ThemeProvider theme={lightTheme}>
      {/* /** Terra Station Wallet Address :: useWallet() */}
      <WalletProvider
        defaultNetwork={defaultNetwork}
        walletConnectChainIds={walletConnectChainIds}
        connectorOpts={{
          bridge: 'https://walletconnect.terra.dev/',
        }}
      >
        <TerraWebappProvider
          mantleFetch={defaultMantleFetch}
          txRefetchMap={ANCHOR_TX_REFETCH_MAP}
          txErrorReporter={errorReporter}
          queryErrorReporter={errorReporter}
        >
          <WebappBankProvider
            cw20TokenContracts={cw20TokenContracts}
            maxCapTokenDenoms={maxCapTokenDenoms}
          >
            <AnchorWebappProvider>
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
                <IonTabBar slot="bottom" color="light">
                  <IonTabButton tab="tab1" href="/tab1">
                    <IonIcon icon={speedometer} />
                    <IonLabel>Peg </IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon icon={wallet} />
                    <IonLabel>Vaults</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon icon={business} />
                    <IonLabel>Governance</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>

            </IonReactRouter>
            </AnchorWebappProvider>
          </WebappBankProvider>
        </TerraWebappProvider>
      </WalletProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;
