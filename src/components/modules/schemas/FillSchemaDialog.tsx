import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import { IconButton } from "~/components/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDialog } from "~/util/hooks";
import { ConfirmDialog } from "~/components/Dialog";
import { api } from "~/utils/api";
import { Schema } from "@prisma/client";

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
  display: inline-block;
  width: 120px;
  flex-direction: row;
  margin-left: auto;
  gap: 0.5rem;

  & > * {
    float: right;
  }

  & > :last-child {
    margin-right: 8px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

interface FillSchemaDialogProps {
  schema: Schema;
  schemaId: string;
  handleClose: () => void;
  origin: "new" | "edit";
}

export const FillSchemaDialog: React.FC<FillSchemaDialogProps> = ({
  schema,
  schemaId,
  origin,
  handleClose,
}) => {
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const { DialogComponent, closeDialog, openDialog } = useDialog({
    dialogContent: dialogContent ?? <></>,
  });
  const { data: schemaData, isLoading: schemaLoading } =
    api.schema.getSchema.useQuery({
      groupId: schema.groupId,
      schemaId: schemaId,
    });
  console.log(schemaData);
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
      <TitleContainer>
        <Typography variant="h6">{schema.name}</Typography>
        <ActionContainer>
          <IconButton onClick={handleCloseSchemaDialog}>
            <CloseIcon />
          </IconButton>
          <IconButton>
            <RestartAltIcon />
          </IconButton>
        </ActionContainer>
      </TitleContainer>
      {schemaData?.ok &&
        schemaData.data.fields.map((field) => (
          <>
            <Typography>{field.name}</Typography>
            <TextField />
          </>
        ))}
      <DialogComponent />
    </Wrapper>
  );
};
