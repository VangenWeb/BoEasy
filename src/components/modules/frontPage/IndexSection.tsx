import { Button, IconButton } from "@mui/material";
import { AuthCard } from "../auth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { signIn } from "next-auth/react";
export const IndexSection: React.FC = () => {
  function handleLogin() {
    signIn("auth0", {
      redirect: true,
      callbackUrl: "http://localhost:3000/home",
    }).catch((err) => console.warn(err));
  }

  return (
    <div className="bg ml-auto mr-auto flex  max-h-[100%] max-w-[450px] flex-1 flex-col overflow-hidden pb-[80px]">
      <div className="mt-4 text-center text-2xl text-white drop-shadow-lg text-shadow-text8">
        !!!Early WIP!!!
      </div>
      <div className="mb-4 mt-12 text-center text-4xl text-white text-shadow-text8">
        BoEasy
      </div>
      <div
        className={` 
        relative z-10  mt-[100px] flex justify-center overflow-visible 
        before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-[-1] before:h-[160%] before:w-[200%] before:translate-x-[-30%] before:translate-y-[-18%] before:rotate-[-20deg] before:bg-white before:shadow-xl before:content-['']
        `}
      >
        <div className="z-10 mb-4  p-4 px-4 text-lg text-black">
          <p className="mb-2">Enkel utfylling av skjemaer og info skriv</p>
        </div>
      </div>
      <div className="mb-11 text-center  text-lg text-white drop-shadow-lg text-shadow-text8"></div>
      <div className="mb-auto  flex flex-col items-center justify-center p-1 px-10">
        <Button
          onClick={handleLogin}
          variant="contained"
          className="z-20 mb-11 w-[100%]"
        >
          Log in
        </Button>
      </div>
    </div>
  );
};
