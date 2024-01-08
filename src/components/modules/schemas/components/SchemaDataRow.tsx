import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { type SchemaDataWithUser } from "~/server/api/bll/schema/types/schema";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
  padding-left: 0.5rem;

  border: 1px solid #b8b8b8f9;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SchemaDataRow: React.FC<SchemaDataWithUser> = (schemaData) => {
  return (
    <Wrapper>
      <Row>
        {schemaData.createdBy?.name ?? schemaData.createdBy?.email ?? "Ukjent"}
        <IconButton
          sx={{
            marginLeft: "auto",
          }}
        >
          <Link href={`/schemas/view/${schemaData.id}`}>
            <OpenInNewIcon />
          </Link>
        </IconButton>
      </Row>
      <Row>
        {schemaData.updatedAt.toDateString()}
        {schemaData.delivered ? " - Levert" : " - Ikke levert"}
        <IconButton
          sx={{
            marginLeft: "auto",
          }}
        >
          <SettingsApplicationsIcon />
        </IconButton>
      </Row>
    </Wrapper>
  );
};
