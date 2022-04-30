import React, { FC } from "react";
import Link from "next/link";
import {
  Flex,
  Box,
  Image,
  Link as _Link,
  HStack,
  VStack,
  Text,
  Divider,
  Show,
  Spacer
} from "@chakra-ui/react";

import MediumIcon from "components/icons/MediumIcon";
import GithubIcon from "components/icons/GithubIcon";
import YoutubeIcon from "components/icons/YoutubeIcon";
import TwitterIcon from "components/icons/TwitterIcon";

const WhaleLogo = () => (
  <HStack mb={{ base: "8", md: "unset" }}>
    <Link href="/" passHref>
      <a>
        <Image src="/logo.svg" alt="WhiteWhale Logo" boxSize="9" />
      </a>
    </Link>
    <HStack>
      <Text as="span" variant="light" color="white" fontSize="md" fontWeight="100"> White </Text>
      <Text as="span" variant="light" color="white" fontSize="md" fontWeight="bold"> Whale </Text>
    </HStack>

  </HStack>
)
const CertLogo = () => (
  <HStack gap={8} justifyContent={{ base: "space-between", md: "unset" }}>
    <Link href="https://www.certik.com/projects/white-whale" passHref>
      <a target="_blank" rel="noreferrer" >
        <Image
          src="/certik.png"
          alt="certik logo"
          maxW="70px"
        />
      </a>
    </Link>

    <Link passHref href="https://github.com/oak-security/audit-reports/blob/master/WhiteWhale/Audit%20Report%20-%20White%20Whale.pdf">
      <a target="_blank" rel="noreferrer" >
        <Image
          objectFit='cover'
          src="/oak.png"
          alt="oak logo"
          maxW="110px"
        />
      </a>
    </Link>

  </HStack>
)

const SocialMedia = () => (
  <Flex justifyContent="space-between" pt={{ base: "10", md: "unset" }}>
    <HStack color="white" spacing="4">
      <a
        href="https://medium.com/@whitewhaleterra"
        target="_blank"
        rel="noreferrer"
      >
        <MediumIcon width="1.5rem" height="1.5rem" />
      </a>
      <a
        href="https://twitter.com/WhiteWhaleTerra"
        target="_blank"
        rel="noreferrer"
      >
        <TwitterIcon width="1.5rem" height="1.5rem" />
      </a>
      {/* <a href="https://google.com">
            <DiscordIcon width="1.5rem" height="1.5rem" />
          </a> */}
      <a
        href="https://github.com/orgs/White-Whale-Defi-Platform"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon width="1.5rem" height="1.5rem" />
      </a>
      {/* <a href="https://google.com">
            <TelegramIcon width="1.5rem" height="1.5rem" />
          </a> */}
      <a
        href="https://www.youtube.com/channel/UCtvVR3Tw5Um4FtyncauNz2g"
        target="_blank"
        rel="noreferrer"
      >
        <YoutubeIcon width="1.5rem" height="1.5rem" />
      </a>

      <Spacer />

      
    </HStack>

  </Flex>
)

const Footer: FC = () => {
  return (
    <Box
      w="full"
      maxW="container.xl"
      margin="0 auto"
      mt={{ base: "16", md: "32" }}
      px={{ base: "4" }}
    >
    <Flex direction="column" paddingY="12" >
      <Flex direction={{ base: "column", md: "row" }}
        paddingY="4"
        borderBottom="1px solid"
        borderBottomColor="whiteAlpha.300">
        <WhaleLogo />
        <Spacer />
        <CertLogo />
      </Flex>


      <Flex paddingY="4" direction={{ base: "column", md: "row" }} >
        <SocialMedia />
        {/* <HStack gap={6} >
          <Link href="/" passHref>
            <a>
              <Text as="span" variant="light" color="white" fontSize="13px" > Lightpaper </Text>
            </a>
          </Link>
          <Link href="/" passHref>
            <a>
              <Text as="span" variant="light" color="white" fontSize="13px" > Contact </Text>
            </a>
          </Link>
          <Link href="/" passHref>
            <a>
              <Text as="span" variant="light" color="white" fontSize="13px" > Terms </Text>
            </a>
          </Link>
        </HStack> */}


        <Show above='sm'>
          <Spacer />
        </Show>

        <Text color="#7A7A7A" fontSize="xs" mt={{ base: "8", md: "unset" }} alignSelf="center">© Copyright 2021 - Legal</Text>

        {/* <SocialMedia /> */}

      </Flex>


    </Flex>
    </Box>
  );
};

export default Footer;

