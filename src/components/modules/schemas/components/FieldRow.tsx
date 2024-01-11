import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { type SchemaDataFieldObject } from "~/server/api/bll/files/types/schema";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 0.5rem;
  border-bottom: 1px solid #b8b8b8f9;
  border-radius: 4px;
`;

interface FieldRowProps {
  field: SchemaDataFieldObject;
}

export const FieldRow: React.FC<FieldRowProps> = ({ field }) => {
  if (field.type === "title") {
    return (
      <Wrapper>
        <Typography variant="h5">{field.name}</Typography>
      </Wrapper>
    );
  }

  if (field.type === "checkbox") {
    return (
      <Wrapper>
        <Typography variant="h6">{field.name}</Typography>
        <Typography variant="body1">{field.answer ? "Ja" : "Nei"}</Typography>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Typography variant="h6">{field.name}</Typography>
      <Typography variant="body1">{field.answer}</Typography>
    </Wrapper>
  );
};
