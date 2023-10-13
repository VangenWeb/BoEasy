import { Button, Card, CardContent, styled } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ContentWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
}));

export const AuthCard: React.FC = ({}) => {
  const session = useSession();
  const router = useRouter();

  function handleLogin() {
    signIn("auth0", {
      redirect: true,
      callbackUrl: "http://localhost:3000/home",
    }).catch((err) => console.warn(err));
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/home").catch((err) => console.warn(err));
    }
  }, [router, session.status]);

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "450px",
      }}
    >
      <CardContent>
        <ContentWrapper>
          <Button variant="outlined" onClick={handleLogin}>
            Log in
          </Button>
        </ContentWrapper>
      </CardContent>
    </Card>
  );
};
