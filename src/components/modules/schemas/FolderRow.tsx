import styled from "@emotion/styled";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { CircularProgress, IconButton } from "@mui/material";
import { type SchemaFolder } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import SchemaRow from "./SchemaRow";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e0e0;
`;

interface NameContainerProps {
  isExpanded: boolean;
}
const NameContainer = styled.div<NameContainerProps>`
  display: flex;
  flex: 1;
  align-items: center;

  background-color: ${(props) =>
    props.isExpanded ? "#E0E0E0" : "transparent"};
  & > :last-child {
    margin-left: auto;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const FolderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;

  & > :last-child {
    border-bottom: none;
  }
`;

const FolderRow: React.FC<SchemaFolder> = (folder) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<string[]>([]);

  const {
    data: childrenData,
    refetch: refetchChildrenFolders,
    isFetching: isFetchingFolders,
    isLoading: isLoadingFolders,
  } = api.schema.getChildren.useQuery(
    {
      groupId: folder.groupId,
      parentId: folder.id,
    },
    {
      enabled: isExpanded,
    },
  );

  const { mutate, isLoading } = api.schema.createFolder.useMutation();

  function handleCreateFolder() {
    if (!folder.groupId) {
      // Add error handling
      return;
    }
    const name = prompt("Navn på mappen");

    if (!name) {
      return;
    }
    mutate(
      {
        name: name,
        parentId: folder.id ?? null,
        groupId: folder.groupId,
      },
      {
        onSuccess: () => {
          void refetchChildrenFolders().catch((err) => console.error(err));
        },
      },
    );
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Wrapper>
      <NameContainer isExpanded={isExpanded}>
        <FolderIcon /> {folder.name}{" "}
        {(isLoadingFolders || isFetchingFolders) && isExpanded && (
          <CircularProgress size={16} />
        )}
        <ActionRow>
          <IconButton>
            <SettingsApplicationsIcon />
          </IconButton>
          <IconButton onClick={handleExpand}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ActionRow>
      </NameContainer>
      {isExpanded && (
        <FolderWrapper>
          {childrenData?.ok &&
            childrenData.data.folders.map((child) => (
              <FolderRow key={child.id} {...child} />
            ))}
          {childrenData?.ok &&
            childrenData.data.schemas.map((schema) => {
              return <SchemaRow key={schema.id} {...schema} />;
            })}
        </FolderWrapper>
      )}
    </Wrapper>
  );
};

export default FolderRow;
