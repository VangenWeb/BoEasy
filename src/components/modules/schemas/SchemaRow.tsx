import styled from "@emotion/styled";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { IconButton } from "@mui/material";
import { type Schema } from "@prisma/client";
import { useRef, useState } from "react";
import { IconMenu } from "~/components/Menu";
import { useDialog } from "~/util/hooks";
import { FillSchemaDialog } from "./FillSchemaDialog";

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

const SchemaRow: React.FC<Schema> = (schema) => {
  const menuAnchor = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { DialogComponent, closeDialog, openDialog } = useDialog({
    fullscreen: true,
    dialogContent: (
      <FillSchemaDialog
        schemaId={schema.id}
        handleClose={handleCloseSchemaDialog}
      />
    ),
  });

  function handleOpenSchemaDialog() {
    openDialog();
  }

  function handleCloseSchemaDialog() {
    closeDialog();
  }

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }
  return (
    <Wrapper>
      <NameContainer>
        <ArticleIcon />
        <div>{schema.name}</div>
      </NameContainer>
      <IconButton ref={menuAnchor} onClick={handleOpenMenu}>
        <SettingsApplicationsIcon />
      </IconButton>

      <IconMenu
        items={[
          {
            type: "item",
            text: "Fyll ut skjema",
            icon: <NoteAltIcon />,
            onClick: handleOpenSchemaDialog,
          },
          {
            type: "item",
            text: "Se tidligere utfylte skjemaer",
            icon: <ArticleIcon />,
            onClick: () => void 0,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            text: "Slett skjema",
            icon: <DeleteIcon />,
            onClick: () => void 0,
          },
        ]}
        anchor={menuAnchor?.current}
        open={isMenuOpen}
        handleClose={handleCloseMenu}
      />
      <DialogComponent />
    </Wrapper>
  );
};

export default SchemaRow;
