import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import {
  type FieldType,
  type SchemaAudience,
  type SchemaRecurrence,
} from "@prisma/client";
import { ReactNode, useContext, useState } from "react";
import { IconButton } from "~/components/Button";
import { ConfirmDialog } from "~/components/Dialog";
import { CreateSchemaContext } from "~/util/context/CreateSchemaContext";
import { useDialog } from "~/util/hooks";
import { getFieldRowIcon } from "./util";
import {
  DragDropContext,
  Droppable,
  Draggable,
  Announce,
  DropResult,
} from "react-beautiful-dnd";
import { onChange } from "~/util/dndUtils";
import { XDrop } from "~/components/DragAndDrop/Drop";
import { XDrag } from "~/components/DragAndDrop/Drag";

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

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  word-wrap: break-word;
  width: 100%;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 0.5rem;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3rem;
  gap: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

interface CreateSchemaProps {
  groupId: string;
  parentId: string;
  parentName: string;
  handleClose: () => void;
}

export const CreateSchemaDialog: React.FC<CreateSchemaProps> = ({
  groupId,
  parentId,
  parentName,
  handleClose,
}) => {
  const {
    schema,
    isCreating,
    setSchemaName,
    setSchemaRecurrence,
    setSchemaAudience,
    addField,
    removeField,
    resetSchema,
    createSchema,
    setSchema,
  } = useContext(CreateSchemaContext);

  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const { DialogComponent, closeDialog, openDialog } = useDialog({
    dialogContent: dialogContent ?? <></>,
  });

  const [processStep, setProcessStep] = useState<"information" | "fields">(
    "information",
  );
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState<FieldType>("text");

  function handleSchemaRecurrenceChange(event: SelectChangeEvent) {
    setSchemaRecurrence(event.target.value as SchemaRecurrence);
  }

  function handleSchemaAudienceChange(event: SelectChangeEvent) {
    setSchemaAudience(event.target.value as SchemaAudience);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSchemaName(e.target.value);
  }

  const handleFieldTypeChange = (event: SelectChangeEvent) => {
    setFieldType(event.target.value as FieldType);
  };

  const handleAddField = () => {
    addField(fieldType, fieldName);
    setFieldName("");
  };

  function handleRemoveField(index: number) {
    return () => {
      removeField(index);
    };
  }

  function handleCloseSchemaDialog() {
    setDialogContent(
      <ConfirmDialog
        title="Lukk skjema?"
        description="Dette kan medfære tap av data."
        onConfirm={() => {
          closeDialog();
          handleClose();
        }}
        onCancel={closeDialog}
      />,
    );
    openDialog();
  }

  function handleResetSchema() {
    resetSchema(true);
  }

  function handleGoToCreationStep(step: "information" | "fields") {
    //TODO: Add verification
    return () => {
      setProcessStep(step);
    };
  }

  function handleCreateSchema() {
    if (!schema) {
      return;
    }

    createSchema(groupId, parentId);
  }

  const onDragEnd = (res: DropResult) => {
    const { source, destination, draggableId } = res;
    if (!destination) return;
    if (onChange(source, destination)) return;
    if (!schema?.fields) return;

    const newFields = [...schema?.fields];
    const draggedField = newFields[source.index];

    if (!draggedField) return;

    newFields.splice(source.index, 1);
    newFields.splice(destination.index, 0, draggedField);

    setSchema({
      ...schema,
      fields: newFields,
    });
  };

  return (
    <Wrapper>
      <TitleRow>
        Opprett skjema
        <ActionContainer>
          {processStep === "fields" && (
            <IconButton onClick={handleGoToCreationStep("information")}>
              <ArrowBackIcon />
            </IconButton>
          )}

          <IconButton onClick={handleResetSchema}>
            <RestartAltIcon />
          </IconButton>
          <IconButton onClick={handleCloseSchemaDialog}>
            <CloseIcon />
          </IconButton>
        </ActionContainer>
      </TitleRow>

      {processStep === "information" && (
        <>
          <TextField
            value={schema?.name}
            id="outlined-basic"
            label="Skjema navn"
            variant="outlined"
            onChange={handleNameChange}
          />
          <Typography variant="body1">Når skal skjemaet fylles ut?</Typography>
          <FormControl fullWidth>
            <Select
              value={schema?.recurrence}
              onChange={handleSchemaRecurrenceChange}
            >
              <MenuItem value={"none"}>Ved nødvendighet</MenuItem>
              <MenuItem value={"monthly"}>Månedlig</MenuItem>
              <MenuItem value={"quarterly"}>Hvert kvartal</MenuItem>
              <MenuItem value={"yearly"}>Årlig</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body1">Hvem skal fylle ut skjemaet?</Typography>
          <FormControl fullWidth>
            <Select
              value={schema?.audience}
              onChange={handleSchemaAudienceChange}
            >
              <MenuItem value={"none"}>Ved nødvendighet</MenuItem>
              <MenuItem value={"group"}>Alle</MenuItem>
              <MenuItem value={"owner"}>Boretslagleder</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleGoToCreationStep("fields")}
          >
            Gå til neste steg
          </Button>
        </>
      )}

      {processStep === "fields" && (
        <>
          <Typography variant="h6">{schema?.name}</Typography>
          <TextField
            value={fieldName}
            id="outlined-basic"
            label="Legg til felt"
            onChange={(e) => {
              setFieldName(e.target.value);
            }}
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              value={fieldType}
              label="Type"
              onChange={handleFieldTypeChange}
            >
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"checkbox"}>Checkbox</MenuItem>
              <MenuItem value={"title"}>Tittel</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleAddField} variant="contained">
            Legg til felt
          </Button>
          <DragDropContext onDragEnd={onDragEnd}>
            <XDrop droppableId={"ALL-FIELDS"} type="FIELD" direction="vertical">
              {schema?.fields.map((field, index) => (
                <XDrag
                  draggableId={field.name}
                  index={index}
                  key={field.name + "2"}
                  className="field-drop"
                >
                  <FieldRow id={field.name} key={index} className="FIELD">
                    <IconButton size="small" onClick={handleRemoveField(index)}>
                      <DeleteIcon />
                    </IconButton>
                    {getFieldRowIcon(field.type)}
                    <p>{field.name}</p>
                  </FieldRow>
                </XDrag>
              ))}
            </XDrop>
          </DragDropContext>

          <Button
            variant="contained"
            disabled={isCreating}
            sx={{
              marginTop: "auto",
            }}
            onClick={handleCreateSchema}
          >
            {isCreating ? <CircularProgress size="1.5rem" /> : "Lag Skjema"}
          </Button>
        </>
      )}
      <DialogComponent />
    </Wrapper>
  );
};
