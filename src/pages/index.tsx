import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageWrapper } from "~/components";
import { ScrollSnap } from "~/components/ScrollSnap/ScrollSnap";

import { IndexSection } from "~/components/modules/frontPage";
import { RegisterSection } from "~/components/modules/frontPage/RegisterSection";
export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/home").catch((err) => console.warn(err));
    }
  }, [router, session.status]);

  return (
    <>
      <Head>
        <title>Vange Web</title>
        <meta name="description" content="Playground Simple Borettslag App" />
        <link rel="icon" href="/vwulog.ico" />
      </Head>
      <PageWrapper className="relative">
        <Image
          src={"/fp3.jpg"}
          alt="fp image"
          width={1920}
          height={1080}
          className="absolute z-[0] h-[100%] w-[100%] object-cover"
        />
        <ScrollSnap
          className="background"
          sections={[
            { title: "Login", content: <IndexSection key="index-section" /> },
            {
              title: "Register",
              content: <RegisterSection key="register-section" />,
            },
          ]}
        />
      </PageWrapper>
    </>
  );
}
