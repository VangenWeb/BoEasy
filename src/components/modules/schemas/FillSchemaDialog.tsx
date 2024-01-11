import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IconButton } from "~/components/Button";
import { ConfirmDialog } from "~/components/Dialog";
import { FillSchemaContext } from "~/util/context/FillSchemaContext";
import { useDialog } from "~/util/hooks";
import { api } from "~/utils/api";
import { SchemaInputField } from "./components/SchemaInputField";

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 0.5rem;
`;
interface FillSchemaDialogProps {
  schemaId: string;
  schemaDataId?: string;

  onClose: () => void;
  onSave: () => void;
}

export const FillSchemaDialog: React.FC<FillSchemaDialogProps> = ({
  schemaId,
  schemaDataId,
  onClose,
  onSave,
}) => {
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const { DialogComponent, closeDialog, openDialog } = useDialog({
    dialogContent: dialogContent ?? <></>,
  });

  const {
    schemaData: schemaDataObj,
    schemaLoaded,
    createSchemaFromSchema,
    setFieldAnswer,
    resetSchema,
    saveSchema,
  } = useContext(FillSchemaContext);

  const { data: schema, isLoading: schemaLoading } =
    api.schema.getSchema.useQuery(
      {
        schemaId: schemaId,
      },
      {
        enabled: !schemaLoaded && !schemaDataId,
      },
    );

  useEffect(() => {
    if (schema?.ok && !schemaLoaded) {
      createSchemaFromSchema(schema.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  function handleSetFieldAnswer(id: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldAnswer(id, e.target.value);
    };
  }

  function schemaWasSubmitted() {
    closeDialog();
    resetSchema();
    onClose();
    if (onSave) {
      onSave();
    }
  }

  function handleSubmitSchema() {
    setDialogContent(
      <ConfirmDialog
        title="Send inn skjema?"
        description="Du kan ikke endre på skjemaet etter at du har sendt det inn."
        onConfirm={() => {
          closeDialog();
          onClose();
          handleSaveSchema({ deliver: true });
        }}
        onCancel={() => {
          closeDialog();
        }}
      />,
    );
    openDialog();
  }

  function handleSaveSchema({ deliver }: { deliver: boolean }) {
    if (!schema?.ok) {
      return;
    }
    saveSchema({
      groupId: schema.data.groupId,
      onSuccess: schemaWasSubmitted,
      deliver: deliver,
    });
  }

  function handleCloseSchemaDialog() {
    setDialogContent(
      <ConfirmDialog
        title="Lukk skjema?"
        description="Ønsker du å lagre skjemaet før du lukker? Skjemaet kan fylles ut senere."
        onConfirm={() => {
          closeDialog();
          onClose();
          handleSaveSchema({ deliver: false });
        }}
        onDecline={() => {
          closeDialog();
          onClose();
          resetSchema();
        }}
        onCancel={() => {
          closeDialog();
        }}
      />,
    );
    openDialog();
  }

  if (schemaLoading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }

  if (!schema || !schema.ok) {
    return <Wrapper>Something Went Wrong</Wrapper>;
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Typography variant="h6">{schema.data.name}</Typography>
        <ActionContainer>
          <IconButton onClick={handleCloseSchemaDialog}>
            <CloseIcon />
          </IconButton>
          <IconButton>
            <RestartAltIcon />
          </IconButton>
        </ActionContainer>
      </TitleContainer>
      {schema?.ok &&
        schemaDataObj?.fields?.map((field) => (
          <SchemaInputField
            key={field.id}
            field={field}
            onChange={handleSetFieldAnswer(field.id)}
          />
        ))}
      <DialogComponent />
      <ButtonContainer>
        <Button variant="contained" onClick={handleSubmitSchema}>
          Send inn svar
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};
