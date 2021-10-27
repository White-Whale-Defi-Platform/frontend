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
    whaleToken: "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
    ustVault: "",
    ustVaultLpToken: "",
    lunaUstPair: "",
    whaleUstPair: "",
    whaleUstLpToken: "",
    gov: "",
    communityFund: "",
    warchest: "",
  },
  testnet: {
    wallet: "terra1lzquc5em3qrz6e2uyp9se60un4e7wnpf5yvz97",
    aUstToken: "terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl",
    whaleToken: "terra1k8pgyyxde6y893kjfqhtw7q0uttn68th60d6gh",
    ustVault: "terra1fvls828ea6lpyzfz8mtfh9z03ev6hlaknwxtec",
    ustVaultLpToken: "terra16jqj6enhkamy4w6qnqc8ru078hcdv4xkk3cncp",
    lunaUstPair: "terra156v8s539wtz0sjpn8y8a8lfg8fhmwa7fy22aff",
    whaleUstPair: "terra1xq3v5rp0w84ugqesv9m5q3xdx04akacsdlk5z7",
    whaleUstLpToken: "terra1pl98xje34559ama3f7xfm5szkz68qxewgvcgdv",
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
