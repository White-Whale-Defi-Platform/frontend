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
} from "@chakra-ui/react";

import MediumIcon from "components/icons/MediumIcon";
import GithubIcon from "components/icons/GithubIcon";
import YoutubeIcon from "components/icons/YoutubeIcon";
import TwitterIcon from "components/icons/TwitterIcon";

const Footer: FC = () => {
  return (
    <Box
      w="full"
      maxW="container.xl"
      margin="0 auto"
      mb="24"
      mt={{ base: "16", md: "32" }}
      px={{ base: "4" }}
    >
      <Flex width="full" justifyContent="space-between" align="center" mb="5">

        <Box>
          <Text
            fontSize={["md", null, "md"]}
            mt={["8", null, "8"]}
            maxW={[null, null, "3xl"]}
            color="#3CCD64"
          >
            Audited by
          </Text>
          <Flex
            mt={["4", null, "8"]}
            align={[null, null, "center"]}
            flexDirection={["column", null, "row"]}
          >
            <a
              href="https://github.com/oak-security/audit-reports/blob/master/WhiteWhale/Audit%20Report%20-%20White%20Whale.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/oak.png"
                alt="oak logo"
                h="2rem"
                w="10.5rem"
                mt={["2", null, "0"]}
              />
            </a>
            <a
              href="https://www.certik.com/projects/white-whale"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/certik.png"
                alt="certik logo"
                h="2rem"
                w="7rem"
                ml={["0", null, "8"]}
                mt={["6", null, "0"]}
              />
            </a>
          </Flex>
        </Box>
        <HStack align="center" spacing={{ base: "4", md: "16" }} pt="24" display={["none", null, "block"]}>
          <_Link color="#FFFFFF" target="_blank" href="/Litepaper.pdf">
            Litepaper
          </_Link>
          <_Link
            href="https://twitter.com/WhiteWhaleTerra"
            target="_blank"
            rel="noreferrer"
            color="#FFFFFF"
          >
            Contact
          </_Link>
        </HStack>
      </Flex>
      <Divider borderColor="whiteAlpha.00" />
      <Flex justifyContent="space-between" width="full" pt="10">
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
        </HStack>
        <Text color="#7A7A7A">© Copyright 2021 - Legal</Text>
      </Flex>
    </Box>
  );
};

export default Footer;

