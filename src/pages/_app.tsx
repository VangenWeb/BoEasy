import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Layout } from "~/components/modules";
import "~/styles/globals.css";
import ThemeRegistry from "~/theme/ThemeRegistry";
import { CurrentGroupProvider } from "~/util/context/CurrentGroupContext";
import { SnackProvider } from "~/util/context/SnackContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  console.log("App Rendered");

  /*
  useEffect(() => {
    if (!session?.user) {
      router.push("/").catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);
  */

  return (
    <SessionProvider session={session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeRegistry>
          <CurrentGroupProvider>
            <SnackProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackProvider>
          </CurrentGroupProvider>
        </ThemeRegistry>
      </LocalizationProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
