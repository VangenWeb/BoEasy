import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { IconButton } from "~/components/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDialog } from "~/util/hooks";
import { ConfirmDialog } from "~/components/Dialog";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  height: 100vh;
  padding: 0.8rem;
  & > :last-child {
    justify-self: flex-end;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 0.5rem;
`;

interface FillSchemaDialogProps {
  schemaId: string;
  handleClose: () => void;
}

export const FillSchemaDialog: React.FC<FillSchemaDialogProps> = ({
  schemaId,

  handleClose,
}) => {
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const { DialogComponent, closeDialog, openDialog } = useDialog({
    dialogContent: dialogContent ?? <></>,
  });

  function handleCloseSchemaDialog() {
    setDialogContent(
      <ConfirmDialog
        title="Lukk skjema?"
        description="Ønsker du å lagre skjemaet før du lukker? Skjemaet kan fylles ut senere."
        onConfirm={() => {
          closeDialog();
          handleClose();
        }}
        onDecline={() => {
          closeDialog();
          handleClose();
        }}
        onCancel={() => {
          closeDialog();
        }}
      />,
    );
    openDialog();
  }
  return (
    <Wrapper>
      <ActionContainer>
        <IconButton>
          <RestartAltIcon />
        </IconButton>
        <IconButton onClick={handleCloseSchemaDialog}>
          <CloseIcon />
        </IconButton>
      </ActionContainer>
      <DialogComponent />
    </Wrapper>
  );
};
