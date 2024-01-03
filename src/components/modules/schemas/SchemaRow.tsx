import styled from "@emotion/styled";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { IconButton } from "@mui/material";
import { Schema } from "@prisma/client";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e0e0e0;

  & > :last-child {
    margin-left: auto;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const SchemaRow: React.FC<Schema> = (schema) => {
  return (
    <Wrapper>
      <NameContainer>
        <ArticleIcon />
        <div>{schema.name}</div>
      </NameContainer>
      <IconButton>
        <SettingsApplicationsIcon />
      </IconButton>
    </Wrapper>
  );
};

export default SchemaRow;
