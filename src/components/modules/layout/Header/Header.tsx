import styled from "@emotion/styled";
import { Logout } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { Component } from "react";
import { potentialErrorHandling } from "~/util/potentialErrorHandling";

export const Header: React.FC = () => {
  const theme = useTheme();
  const session = useSession();
  function handleSignOut() {
    signOut().catch(potentialErrorHandling);
  }

  const SiteName = styled.div`
    font-size: 1.5rem;
    line-height: 2.5rem;
    font-weight: 500;
    color: white;
  `;

  return (
    <AppBar
      position="static"
      style={{
        gridArea: "header",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SiteName>EasyBo</SiteName>
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
