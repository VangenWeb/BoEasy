import styled from "@emotion/styled";
import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { FieldRow } from "~/components/modules/schemas/components/FieldRow";
import { SchemaDataSchema } from "~/server/api/bll/files/types/schema";
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

  const { data, isLoading, isFetching } = api.file.getSchemaData.useQuery({
    schemaDataId: router.query.schemaDataId as string,
  });

  const schemaData = useMemo(() => {
    if (!data?.ok) return null;
    return SchemaDataSchema.safeParse(data?.data?.data);
  }, [data]);

  console.log(schemaData);

  if (isLoading || isFetching) {
    return (
      <CenterWrapper>
        <CircularProgress />
      </CenterWrapper>
    );
  }

  if (!data?.ok || !schemaData || schemaData?.success == false) {
    return (
      <CenterWrapper>
        <Typography variant="h3">Fant ikke skjema</Typography>
      </CenterWrapper>
    );
  }

  return (
    <Wrapper>
      <Typography
        variant="h5"
        sx={{
          paddingBottom: "0.5rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {data.data.schema.name}
        <Typography
          sx={{
            marginLeft: "auto",
          }}
        >
          {data?.data.createdBy?.name}
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          borderBottom: "2px solid black",
        }}
      >
        {data.data.createdAt.toDateString()}
      </Typography>
      {schemaData.data.fields.map((field) => (
        <FieldRow key={field.id} field={field} />
      ))}
      <ActionRow></ActionRow>
    </Wrapper>
  );
}
