import { Button, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { signIn } from "next-auth/react";

export const RegisterSection: React.FC = () => {
  function handleLogin() {
    signIn("auth0", {
      redirect: true,
      callbackUrl: "http://localhost:3000/home",
    }).catch((err) => console.warn(err));
  }

  return (
    <div className="bg ml-auto mr-auto flex max-w-[450px] flex-1 flex-col overflow-hidden pb-[80px]">
      <div className="mb-auto mt-4 px-4 text-center text-2xl text-black drop-shadow-lg text-shadow-text8"></div>

      <div
        className={` 
        relative z-10 mb-[50px] overflow-visible 
        before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-[-1] before:h-[145%] before:w-[200%] before:translate-x-[-30%] before:translate-y-[-22%] before:rotate-[20deg] before:bg-white before:shadow-xl before:content-['']
        `}
      >
        <div className="z-10 mb-4  p-4 px-4 text-lg text-black">
          <p className="mb-2">
            For å komme i gang er det gratis å registrere seg og opprette et
            nytt borettslagsammarbeid
          </p>
          <p>
            Hvis du skal bli med i allerede eksisterende borettslag vil
            borettslagleder kunne invitere deg både før og etter du registrerer
            deg via email.
          </p>
        </div>
      </div>
      <div className="mb-auto mt-4 flex flex-col items-center justify-center p-1 px-10">
        <Button
          onClick={handleLogin}
          variant="contained"
          className="z-20 mb-11 w-[100%]"
        >
          Registrer
        </Button>
      </div>
    </div>
  );
};
