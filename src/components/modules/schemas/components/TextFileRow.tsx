import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import { type TextFile } from "@prisma/client";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import DescriptionIcon from "@mui/icons-material/Description";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { IconMenu } from "~/components/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import TextFieldsIcon from "@mui/icons-material/TextFields";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e0e0e0;

  & > :last-child {
    margin-left: auto;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const TextFileRow: React.FC<TextFile> = (textFile) => {
  const menuAnchor = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleOpenDocument() {
    router
      .push(`/folder/${textFile.parentFolderId}/text-file/${textFile.id}`)
      .catch(() => {
        console.warn("Failed to navigate to text file");
      });
  }

  return (
    <Wrapper>
      <NameContainer onClick={handleOpenDocument}>
        <TextFieldsIcon />
        <Typography variant="body1">{textFile.name}</Typography>
      </NameContainer>
      <IconButton ref={menuAnchor} onClick={handleOpenMenu}>
        <SettingsApplicationsIcon />
      </IconButton>

      <IconMenu
        items={[
          {
            type: "item",
            text: "Åpne dokument",
            icon: <DescriptionIcon />,
            onClick: handleOpenDocument,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            text: "Slett dokument",
            icon: <DeleteIcon />,
            onClick: () => void 0,
          },
        ]}
        anchor={menuAnchor?.current}
        open={isMenuOpen}
        handleClose={handleCloseMenu}
      />
    </Wrapper>
  );
};
