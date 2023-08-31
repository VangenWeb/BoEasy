import { Box, Button, Checkbox, Icon, Slide } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useRef, useState } from "react";
import throttle from "lodash/throttle";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const throttleToggleSidebar = useRef(
    throttle((value: boolean) => {
      setSidebarOpen(value);
    }, 1000),
  );

  function handleToggleSidebar() {
    if (throttleToggleSidebar.current) {
      throttleToggleSidebar.current(!sidebarOpen);
    }
  }

  return (
    <>
      <Head>
        <title>Vange Web</title>
        <meta name="description" content="Firm website for Andreas Vangen" />
        <link rel="icon" href="/vwulog.ico" />
      </Head>
      <main className="flex min-h-screen flex-col ">
        <div className="flex min-h-screen flex-col md:flex-row">
          <div className="flex flex-1 flex-col bg-blue-100">
            <div className="z-10 flex flex-row items-center p-4 shadow-sm">
              <div className={`flex flex-1 flex-row items-center gap-3 pr-3`}>
                <Image alt="logo" src="/logo.png" width={64} height={64} />
                <span className="font-mono text-xl">Vangen Webutvikling</span>
              </div>
            </div>
            <div className="content flex flex-1 flex-col gap-4 bg-white p-4">
              <h1 className="ml-[3rem] mt-[10rem] font-sans text-3xl"></h1>

              <Box
                sx={{
                  flex: 1,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Checkbox
                    checked={activeBoxIndex === 0}
                    onChange={() => {
                      setActiveBoxIndex(-1);
                      setTimeout(() => {
                        setActiveBoxIndex(0);
                      }, 200);
                    }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  <Checkbox
                    checked={activeBoxIndex === 1}
                    onChange={() => {
                      setActiveBoxIndex(-1);
                      setTimeout(() => {
                        setActiveBoxIndex(1);
                      }, 200);
                    }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                </Box>
                <Slide
                  direction="up"
                  in={activeBoxIndex === 0}
                  mountOnEnter
                  unmountOnExit
                >
                  <Box sx={{ flex: 1, p: 1 }}>xd</Box>
                </Slide>
                <Slide
                  direction="up"
                  in={activeBoxIndex === 1}
                  mountOnEnter
                  unmountOnExit
                >
                  <Box sx={{ flex: 1, p: 1 }}>xd2</Box>
                </Slide>
              </Box>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
