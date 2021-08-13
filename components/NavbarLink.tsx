import React, { FC } from "react";
import { Text, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const NavbarLink: FC<Props> = ({ text, href }) => {
  const { asPath } = useRouter();

  const wrapperStyle =
    asPath === href
      ? { color: "brand.500", borderBottomColor: "brand.500" }
      : { color: "brand.200" };

  return (
    <Link href={href} passHref>
      <chakra.a
        transition="0.2s all"
        fontWeight="700"
        fontSize="1.15rem"
        mb="-2px!important"
        px="2"
        py="8"
        borderBottomWidth="2px"
        borderBottomColor="transparent"
        _hover={{
          color: "brand.500",
          borderBottomColor: "brand.500",
        }}
        {...wrapperStyle}
      >
        {text}
      </chakra.a>
    </Link>
  );
};

export default NavbarLink;
