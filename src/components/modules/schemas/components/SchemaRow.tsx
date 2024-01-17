import styled from "@emotion/styled";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { IconButton } from "@mui/material";
import { type Schema } from "@prisma/client";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { IconMenu } from "~/components/Menu";
import { FillSchemaContextProvider } from "~/util/context/FillSchemaContext";
import { useDialog } from "~/util/hooks";
import { useSnack } from "~/util/hooks/useSnack";
import { potentialErrorHandling } from "~/util/potentialErrorHandling";
import { FillSchemaDialog } from "../FillSchemaDialog";

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
  const router = useRouter();
  const { DialogComponent, closeDialog, openDialog } = useDialog({
    fullscreen: true,
    dialogContent: (
      <FillSchemaDialog
        schemaId={schema.id}
        onClose={handleCloseSchemaDialog}
        onSave={handleSchemaSaved}
      />
    ),
  });

  const { SnackComponent, createSnack } = useSnack({
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  });

  function handleSchemaSaved() {
    createSnack({
      message: "Skjema lagret",
      type: "success",
    });
  }

  const Dialog = useMemo(() => <DialogComponent />, [DialogComponent]);

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

  function handleGoToSchemaData(id: string) {
    return () => {
      router
        .push(`/schemas/${id}`)
        .catch((err: Error) => potentialErrorHandling(err));
    };
  }
  return (
    <Wrapper>
      <NameContainer>
        <AssignmentIcon />
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
            onClick: handleGoToSchemaData(schema.id),
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
      <FillSchemaContextProvider>{Dialog}</FillSchemaContextProvider>
      <SnackComponent />
    </Wrapper>
  );
};

export default SchemaRow;
