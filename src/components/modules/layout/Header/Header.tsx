import { Logout } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { Component } from "react";

export const Header: React.FC = () => {
  const theme = useTheme();
  const session = useSession();
  function handleSignOut() {
    const loggedOut = signOut();
  }
  return (
    <AppBar
      position="static"
      style={{
        gridArea: "header",
      }}
    >
      <Toolbar>
        {session.status === "authenticated" && (
          <IconButton
            sx={{
              color: theme.palette.common.white,
              marginLeft: "auto",
            }}
            onClick={handleSignOut}
          >
            <Logout />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};
