import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  wallet: string;
  aUstToken: string;
  whaleToken: string;
  ustVault: string;
  ustVaultLpToken: string;
  lunaUstPair: string;
  whaleUstPair: string;
  whaleUstLpToken: string;
  whaleUstStaking: string;
  gov: string;
  communityFund: string;
  warchest: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    wallet: "",
    aUstToken: "",
    whaleToken: "terra1php5m8a6qd68z02t3zpw4jv2pj4vgw4wz0t8mz",
    ustVault: "terra1j3l9e29rv8dmz35lhx8d4yk8qfct6aahdy4c77",
    ustVaultLpToken: "terra1994nxa36w0xxj46e8pd8kanxjuc4astnm2ncxm",
    lunaUstPair: "",
    whaleUstPair: "",
    whaleUstLpToken: "",
    gov: "",
    communityFund: "",
    warchest: "",
  },
  testnet: {
    wallet: "terra1xhhedykp6knc0ygtggwek3w0et3dmwe6apzeuz",
    aUstToken: "terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl",
    whaleToken: "terra183cvzy6knvva6mpvzcq86uyfxw0nd4925m0d0m",
    ustVault: "terra1w0yhdc3atmrpgxz5gq66xltu8t6ez8r9dazvvx",
    ustVaultLpToken: "terra1zuspxvj76ngktnjuawmckpsmynwuvusdnq0pxd",
    lunaUstPair: "terra156v8s539wtz0sjpn8y8a8lfg8fhmwa7fy22aff",
    whaleUstPair: "terra1nyaj3xv93gzh753d03yh5er8wq4vma2rm730fg",
    whaleUstLpToken: "terra1zuspxvj76ngktnjuawmckpsmynwuvusdnq0pxd",
    whaleUstStaking: "terra1acddhgjd7vdedlx870lsu7eavfc6jm5yg70hcg",
    gov: "terra13zkn22u6fs550xdmx2s2mydesd0ym4jk3r4um3",
    communityFund: "terra1ugx7u99t8nqvhrt40ka759kqxy4j4r3n5v5l9j",
    warchest: "terra1twgq7ye7rz75gs82e503gh6n9cm8nvs4tsq88v",
  },
};

const useContracts = (initial?: Networks): Contracts => {
  const {
    network: { name },
  } = useWallet();
  const contracts = initial ?? defaultContracts;

  return useMemo(() => {
    return contracts[name];
  }, [contracts, name]);
};

export default useContracts;
