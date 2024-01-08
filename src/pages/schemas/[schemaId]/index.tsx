import styled from "@emotion/styled";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { SchemaDataRow } from "~/components/modules/schemas/components/SchemaDataRow";
import { api } from "~/utils/api";

const CenterWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export default function SchemaDataList() {
  const [showDelivered, setShowDelivered] = useState(false);
  const router = useRouter();

  const { data, isLoading, isFetching } =
    api.schema.getSchemaWithSchemaData.useQuery({
      schemaId: router.query.schemaId as string,
    });

  if (isLoading || isFetching) {
    return (
      <CenterWrapper>
        <CircularProgress />
      </CenterWrapper>
    );
  }

  if (!data?.ok) {
    return (
      <CenterWrapper>
        <Typography variant="h3">Fant ikke skjema</Typography>
      </CenterWrapper>
    );
  }

  const files = data?.data.data.filter((schemaData) => {
    if (showDelivered) {
      return schemaData.delivered === showDelivered;
    }
    return true;
  });

  return (
    <Wrapper>
      <Typography
        variant="h5"
        sx={{
          borderBottom: "2px solid black",
          paddingBottom: "0.5rem",
        }}
      >
        {data.data.name}
      </Typography>
      <ActionRow>
        <FormControlLabel
          label="Bare vis leverte"
          labelPlacement="start"
          control={
            <Checkbox
              checked={showDelivered}
              onChange={() => setShowDelivered(!showDelivered)}
            />
          }
          sx={{
            marginLeft: "auto",
          }}
        />
      </ActionRow>
      {files.map((schemaData) => {
        return <SchemaDataRow key={schemaData.id} {...schemaData} />;
      })}
    </Wrapper>
  );
}
