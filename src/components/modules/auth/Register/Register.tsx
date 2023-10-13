import { Button, Card, styled } from "@mui/material";

const RegisterWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
}));

export const Register: React.FC = () => {
  return (
    <RegisterWrapper>
      <p>You will be redirected to our external login service.</p>
      <p>We have chosen to use an external service for storing user data.</p>
      <Button variant="outlined">Register</Button>
    </RegisterWrapper>
  );
};
