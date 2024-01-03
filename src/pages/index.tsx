import Head from "next/head";
import { AuthCard, PageWrapper } from "~/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vange Web</title>
        <meta name="description" content="Playground Simple Borettslag App" />
        <link rel="icon" href="/vwulog.ico" />
      </Head>
      <PageWrapper>
        <AuthCard />
      </PageWrapper>
    </>
  );
}
