import styled from "@emotion/styled";
import { Checkbox, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SchemaDataFieldObject } from "~/server/api/bll/schema/types/schema";

interface WrapperProps {
  isCheckbox?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  border-bottom: 1px solid black;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  align-items: center;
`;

interface SchemaInputFieldProps {
  field: SchemaDataFieldObject;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SchemaInputField: React.FC<SchemaInputFieldProps> = ({
  field,
  onChange,
}) => {
  if (field.type === "title") {
    return (
      <TitleWrapper>
        <Typography variant="h5">{field.name}</Typography>
      </TitleWrapper>
    );
  }

  if (field.type === "checkbox") {
    return (
      <Wrapper isCheckbox={true}>
        <Typography>{field.name}</Typography>
        <CheckboxWrapper>
          <Typography>Ja</Typography>
          <Checkbox value={true} onChange={onChange} checked={field.answer} />
          <Typography>Nei</Typography>

          <Checkbox value={false} onChange={onChange} checked={!field.answer} />
        </CheckboxWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Typography>{field.name}</Typography>
      <TextField value={field.answer} onChange={onChange} />
    </Wrapper>
  );
};
