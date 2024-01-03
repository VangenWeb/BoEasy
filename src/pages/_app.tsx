import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/modules";
import ThemeRegistry from "~/theme/ThemeRegistry";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CurrentGroupContext } from "~/util/context/CurrentGroupContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [currentGroup, setCurrentGroup] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) {
      router.push("/").catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  return (
    <SessionProvider session={session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeRegistry>
          <CurrentGroupContext.Provider
            value={{ currentGroup, setCurrentGroup }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CurrentGroupContext.Provider>
        </ThemeRegistry>
      </LocalizationProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
