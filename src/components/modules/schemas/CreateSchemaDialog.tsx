import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { IconButton } from "~/components/Button";
import { CreateSchemaContext } from "~/util/context/CreateSchemaContext";
import { getFieldRowIcon } from "./util";
import {
  SchemaAudience,
  type FieldType,
  type SchemaRecurrence,
} from "@prisma/client";

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

export const CreateSchema: React.FC<CreateSchemaProps> = ({
  groupId,
  parentId,
  parentName,
  handleClose,
}) => {
  const {
    schema,
    setSchemaName,
    setSchemaRecurrence,
    setSchemaAudience,
    addField,
    removeField,
    resetSchema,
    createSchema,
  } = useContext(CreateSchemaContext);

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
    if (!fieldName || fieldName === "") {
      alert("Feltnavn kan ikke være tomt");
      return;
    }
    addField(fieldType, fieldName);
    setFieldName("");
  };

  function handleRemoveField(index: number) {
    return () => {
      removeField(index);
    };
  }

  function handleCloseSchemaDialog() {
    const confirmed = confirm(
      "Er du sikker på at du vil lukke skjemaet? Data kan gå tapt hvis nettstedet lukkes eller du navigerer bort fra denne siden.",
    );

    if (confirmed) {
      handleClose();
    }
  }

  function handleResetSchema() {
    const confirmed = confirm("Er du sikker på at du vil slette skjemaet?");

    if (confirmed) {
      resetSchema();
    }
  }

  function handleGoToCreationStep(step: "information" | "fields") {
    return () => {
      setProcessStep(step);
    };
  }

  function handleCreateSchema() {
    console.log("handleCreateSchemaClicked");
    if (!schema) {
      return;
    }

    createSchema(groupId, parentId);
  }

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
              <MenuItem value={"anytime"}>Ved nødvendighet</MenuItem>
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
            </Select>
          </FormControl>
          <Button onClick={handleAddField} variant="contained">
            Legg til felt
          </Button>
          <FieldContainer>
            {schema?.fields.map((field, index) => (
              <FieldRow key={field.name}>
                <IconButton size="small" onClick={handleRemoveField(index)}>
                  <DeleteIcon />
                </IconButton>
                {getFieldRowIcon(field.type)}

                <p>{field.name}</p>
              </FieldRow>
            ))}
          </FieldContainer>
          <Button
            variant="contained"
            sx={{
              marginTop: "auto",
            }}
            onClick={handleCreateSchema}
          >
            Lag Skjema
          </Button>
        </>
      )}
    </Wrapper>
  );
};
