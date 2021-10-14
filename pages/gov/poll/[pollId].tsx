import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage } from "next";

import Poll from "components/pages/Poll";

const PollPage: NextPage = () => {
  const router = useRouter();
  const { pollId } = router.query;
  //@ts-expect-error
  const id = parseInt(pollId);

  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Poll pollId={id} />
    </>
  );
};

export default PollPage;
