import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/modules";
import ThemeRegistry from "~/theme/ThemeRegistry";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeRegistry>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeRegistry>
      </LocalizationProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
