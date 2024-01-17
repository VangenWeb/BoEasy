import { Button, Card, CardContent, styled } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { signIn } from "next-auth/react";

const ContentWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
}));

export const AuthCard: React.FC<CommonProps> = ({ className }) => {
  function handleLogin() {
    signIn("auth0", {
      redirect: true,
      callbackUrl: "http://localhost:3000/home",
    }).catch((err) => console.warn(err));
  }

  return (
    <Card
      variant="outlined"
      className={className}
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
          <Button variant="outlined" onClick={handleLogin}>
            Registrer deg
          </Button>
        </ContentWrapper>
      </CardContent>
    </Card>
  );
};
