import Head from "next/head";
import { AuthCard, PageWrapper } from "~/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vange Web</title>
        <meta name="description" content="Firm website for Andreas Vangen" />
        <link rel="icon" href="/vwulog.ico" />
      </Head>
      <PageWrapper>
        <AuthCard />
      </PageWrapper>
    </>
  );
}
